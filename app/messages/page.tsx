"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Client, DecodedMessage } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Check, 
  CheckCheck,
  Plus,
  Users,
  Briefcase,
  FileText,
  Image as ImageIcon,
  Download,
  ExternalLink,
  Wallet,
  Shield
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  ensName?: string;
  walletAddress: string;
  avatar: string;
  title: string;
  company: string;
  isOnline: boolean;
}

interface XMTPMessage {
  id: string;
  content: string;
  senderAddress: string;
  timestamp: Date;
  conversation: any;
}

interface Conversation {
  id: string;
  peerAddress: string;
  peerProfile?: User;
  lastMessage?: XMTPMessage;
  unreadCount: number;
  xmtpConversation?: any;
}

export const MessagesPage = () => {
  const [xmtpClient, setXmtpClient] = useState<Client | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string>('');
  const [messages, setMessages] = useState<XMTPMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newConversationAddress, setNewConversationAddress] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setWalletAddress(address);
        setWalletConnected(true);
        
        // Initialize XMTP client
        const client = await Client.create(signer, { env: 'production' });
        setXmtpClient(client);
        
        // Load conversations
        await loadConversations(client);
        
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const loadConversations = async (client: Client) => {
    try {
      const xmtpConversations = await client.conversations.list();
      const conversationList: Conversation[] = [];
      
      for (const conv of xmtpConversations) {
        const messages = await conv.messages({ limit: 1 });
        const lastMessage = messages[0] ? {
          id: `${conv.topic}-${messages[0].id}`,
          content: messages[0].content,
          senderAddress: messages[0].senderAddress,
          timestamp: messages[0].sent,
          conversation: conv
        } : undefined;
        
        // Try to resolve ENS name for peer address
        const peerProfile: User = {
          id: conv.peerAddress,
          name: conv.peerAddress.slice(0, 6) + '...' + conv.peerAddress.slice(-4),
          ensName: undefined, // Could implement ENS resolution here
          walletAddress: conv.peerAddress,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${conv.peerAddress}`,
          title: 'Web3 Professional',
          company: 'Decentralized',
          isOnline: false
        };
        
        conversationList.push({
          id: conv.topic,
          peerAddress: conv.peerAddress,
          peerProfile,
          lastMessage,
          unreadCount: 0,
          xmtpConversation: conv
        });
      }
      
      setConversations(conversationList);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const loadMessages = async (conversation: Conversation) => {
    if (!conversation.xmtpConversation) return;
    
    try {
      const xmtpMessages = await conversation.xmtpConversation.messages({ limit: 50 });
      const messageList: XMTPMessage[] = xmtpMessages.map((msg: DecodedMessage) => ({
        id: `${conversation.id}-${msg.id}`,
        content: msg.content,
        senderAddress: msg.senderAddress,
        timestamp: msg.sent,
        conversation: conversation.xmtpConversation
      }));
      
      setMessages(messageList.reverse());
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !xmtpClient) return;
    
    const conversation = conversations.find(c => c.id === selectedConversation);
    if (!conversation?.xmtpConversation) return;
    
    try {
      await conversation.xmtpConversation.send(newMessage);
      setNewMessage('');
      
      // Reload messages to include the new one
      await loadMessages(conversation);
      
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const startNewConversation = async () => {
    if (!newConversationAddress || !xmtpClient) return;
    
    try {
      setIsLoading(true);
      
      // Check if the address can receive XMTP messages
      const canMessage = await xmtpClient.canMessage(newConversationAddress);
      if (!canMessage) {
        alert('This address is not registered with XMTP and cannot receive messages.');
        return;
      }
      
      // Create new conversation
      const conversation = await xmtpClient.conversations.newConversation(newConversationAddress);
      
      // Reload conversations
      await loadConversations(xmtpClient);
      
      setNewConversationAddress('');
      setShowNewMessage(false);
      
    } catch (error) {
      console.error('Failed to start conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.peerProfile?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.peerProfile?.ensName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.peerAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  // Handle conversation selection
  useEffect(() => {
    if (selectedConversation && currentConversation) {
      loadMessages(currentConversation);
    }
  }, [selectedConversation, currentConversation]);

  if (!walletConnected) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="h-10 w-10 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Connect Your Wallet
          </h1>
          
          <p className="text-gray-600 mb-6">
            Connect your Web3 wallet to start secure, decentralized messaging with XMTP protocol.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">End-to-End Encrypted</span>
            </div>
            <p className="text-xs text-blue-600">
              Your messages are encrypted and stored on the decentralized XMTP network
            </p>
          </div>
          
          <Button
            onClick={connectWallet}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
          
          <p className="text-xs text-gray-500 mt-4">
            Supports MetaMask, WalletConnect, and other Web3 wallets
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">VCR Messages</h1>
              <p className="text-xs text-gray-500">Powered by XMTP</p>
            </div>
            <Button
              onClick={() => setShowNewMessage(true)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mb-3">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* New Message Modal */}
        {showNewMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-lg font-semibold mb-4">New Message</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Address (ENS or wallet)
                  </label>
                  <Input
                    placeholder="vitalik.eth or 0x..."
                    value={newConversationAddress}
                    onChange={(e) => setNewConversationAddress(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowNewMessage(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={startNewConversation}
                    disabled={!newConversationAddress || isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? 'Starting...' : 'Start Chat'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No conversations yet</p>
                <Button
                  onClick={() => setShowNewMessage(true)}
                  variant="link"
                  size="sm"
                  className="mt-2"
                >
                  Start your first chat
                </Button>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`mb-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.peerProfile?.avatar} />
                          <AvatarFallback>
                            {conversation.peerAddress.slice(2, 4).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {conversation.peerProfile?.ensName || 
                               `${conversation.peerAddress.slice(0, 6)}...${conversation.peerAddress.slice(-4)}`}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {conversation.lastMessage && (
                              <p className="text-xs text-gray-500">
                                {conversation.lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            )}
                            {conversation.unreadCount > 0 && (
                              <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {conversation.peerProfile?.ensName && (
                          <p className="text-xs text-blue-600 mb-1">{conversation.peerAddress.slice(0, 10)}...</p>
                        )}
                        
                        {conversation.lastMessage && (
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage.content}
                          </p>
                        )}
                        
                        <div className="flex items-center mt-1">
                          <Shield className="h-3 w-3 text-green-500 mr-1" />
                          <p className="text-xs text-green-600">XMTP Encrypted</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={currentConversation.peerProfile?.avatar} />
                    <AvatarFallback>
                      {currentConversation.peerAddress.slice(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {currentConversation.peerProfile?.ensName || 
                         `${currentConversation.peerAddress.slice(0, 6)}...${currentConversation.peerAddress.slice(-4)}`}
                      </h2>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Encrypted
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      {currentConversation.peerAddress}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderAddress === walletAddress ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.senderAddress === walletAddress 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200'
                    } rounded-lg p-3`}>
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-xs ${
                          message.senderAddress === walletAddress ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.senderAddress === walletAddress && (
                          <div className="ml-2">
                            <CheckCheck className="h-3 w-3 text-blue-100" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="resize-none"
                  />
                </div>
                
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  Press Enter to send • Messages are end-to-end encrypted
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Shield className="h-3 w-3 mr-1" />
                  XMTP Protocol
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Welcome to VCR Messaging
              </p>
              <p className="text-gray-600 mb-4 max-w-md">
                Start secure, decentralized conversations with your Web3 network using XMTP protocol
              </p>
              <Button 
                onClick={() => setShowNewMessage(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Start New Conversation
              </Button>
              
              <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                <Shield className="h-4 w-4 mr-1" />
                End-to-end encrypted with XMTP
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;