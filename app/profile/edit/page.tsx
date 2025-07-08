"use client";

import React, { useState, useRef } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Camera, 
  Plus, 
  X, 
  Trash2, 
  Save, 
  ArrowLeft, 
  MapPin, 
  Briefcase,
  Calendar,
  Award,
  Link,
  Shield,
  Upload,
  Edit,
  AlertCircle
} from 'lucide-react';

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface Web3Credential {
  id: string;
  type: 'NFT' | 'POAP' | 'Certificate' | 'Badge';
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface ProfileFormData {
  // Basic Information
  name: string;
  title: string;
  location: string;
  bio: string;
  
  // Images
  profilePicture?: string;
  coverPhoto?: string;
  
  // Experience
  experience: WorkExperience[];
  
  // Skills
  skills: Skill[];
  
  // Web3 Credentials
  credentials: Web3Credential[];
  
  // Contact Information
  ensName: string;
  walletAddress: string;
  socialLinks: SocialLink[];
  
  // Privacy Settings
  showEmail: boolean;
  showWallet: boolean;
  publicProfile: boolean;
  showCredentials: boolean;
}

export const ProfileEditPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: string; id: string } | null>(null);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' as const });
  const [showSkillDialog, setShowSkillDialog] = useState(false);

  const profilePictureRef = useRef<HTMLInputElement>(null);
  const coverPhotoRef = useRef<HTMLInputElement>(null);

  const { 
    control, 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    formState: { errors, isValid, isDirty } 
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: 'Alex Chen',
      title: 'Senior Blockchain Developer',
      location: 'San Francisco, CA',
      bio: 'Passionate about building the future of Web3 with 5+ years of experience in blockchain development and DeFi protocols.',
      ensName: 'alexchen.eth',
      walletAddress: '0x742d5Cc419A4e32a1b0D2D2E4fF3eBe7c9fA4B6Dd',
      experience: [
        {
          id: '1',
          company: 'Uniswap Labs',
          position: 'Senior Smart Contract Developer',
          startDate: '2022-01',
          endDate: '',
          current: true,
          description: 'Leading development of next-generation AMM protocols and liquidity management systems.'
        }
      ],
      skills: [
        { id: '1', name: 'Solidity', level: 'Expert' },
        { id: '2', name: 'React', level: 'Advanced' },
        { id: '3', name: 'TypeScript', level: 'Advanced' }
      ],
      credentials: [
        {
          id: '1',
          type: 'Certificate',
          title: 'Ethereum Developer Certification',
          issuer: 'ConsenSys Academy',
          date: '2023-06',
          description: 'Advanced Ethereum development and smart contract security'
        }
      ],
      socialLinks: [
        { id: '1', platform: 'GitHub', url: 'https://github.com/alexchen' },
        { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/alexchen' }
      ],
      showEmail: false,
      showWallet: true,
      publicProfile: true,
      showCredentials: true
    }
  });

  const { 
    fields: experienceFields, 
    append: appendExperience, 
    remove: removeExperience 
  } = useFieldArray({
    control,
    name: "experience"
  });

  const { 
    fields: credentialFields, 
    append: appendCredential, 
    remove: removeCredential 
  } = useFieldArray({
    control,
    name: "credentials"
  });

  const { 
    fields: socialFields, 
    append: appendSocial, 
    remove: removeSocial 
  } = useFieldArray({
    control,
    name: "socialLinks"
  });

  const skillsValue = watch('skills');

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Profile updated:', data);
      // Handle success (show toast, redirect, etc.)
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (type: 'profile' | 'cover', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'profile') {
        setValue('profilePicture', result);
      } else {
        setValue('coverPhoto', result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const skills = skillsValue || [];
      const updatedSkills = [...skills, {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        level: newSkill.level
      }];
      setValue('skills', updatedSkills);
      setNewSkill({ name: '', level: 'Beginner' });
      setShowSkillDialog(false);
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    const skills = skillsValue || [];
    const updatedSkills = skills.filter(skill => skill.id !== skillId);
    setValue('skills', updatedSkills);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      if (deleteTarget.type === 'experience') {
        const index = experienceFields.findIndex(exp => exp.id === deleteTarget.id);
        if (index !== -1) removeExperience(index);
      } else if (deleteTarget.type === 'credential') {
        const index = credentialFields.findIndex(cred => cred.id === deleteTarget.id);
        if (index !== -1) removeCredential(index);
      } else if (deleteTarget.type === 'social') {
        const index = socialFields.findIndex(social => social.id === deleteTarget.id);
        if (index !== -1) removeSocial(index);
      }
    }
    setShowDeleteDialog(false);
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] to-[#E6F2FF] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-[#1A1A1A]">Edit Profile</h1>
              <p className="text-[#666666]">Update your professional Web3 profile</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || !isDirty || isLoading}
              className="bg-[#4F46E5] hover:bg-[#4338CA]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Cover Photo & Profile Picture */}
          <Card>
            <CardContent className="p-6">
              {/* Cover Photo */}
              <div className="relative h-48 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-lg mb-6 overflow-hidden">
                {watch('coverPhoto') && (
                  <img 
                    src={watch('coverPhoto')} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => coverPhotoRef.current?.click()}
                    className="bg-white bg-opacity-20 backdrop-blur-sm text-white border-white border-opacity-30"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Change Cover Photo
                  </Button>
                  <input
                    ref={coverPhotoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload('cover', file);
                    }}
                  />
                </div>
              </div>

              {/* Profile Picture */}
              <div className="relative -mt-16 ml-6">
                <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  {watch('profilePicture') ? (
                    <img 
                      src={watch('profilePicture')} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                       onClick={() => profilePictureRef.current?.click()}>
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <input
                    ref={profilePictureRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload('profile', file);
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="title">Professional Title *</Label>
                  <Input
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="location">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </Label>
                <Input
                  id="location"
                  {...register('location')}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  {...register('bio')}
                  placeholder="Tell us about yourself and your Web3 journey..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Work Experience
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendExperience({
                    id: Date.now().toString(),
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: ''
                  })}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {experienceFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-gray-700">Experience {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteTarget({ type: 'experience', id: field.id });
                        setShowDeleteDialog(true);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company *</Label>
                      <Input
                        {...register(`experience.${index}.company`, { required: true })}
                      />
                    </div>
                    <div>
                      <Label>Position *</Label>
                      <Input
                        {...register(`experience.${index}.position`, { required: true })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        {...register(`experience.${index}.startDate`)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        {...register(`experience.${index}.endDate`)}
                        disabled={watch(`experience.${index}.current`)}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Controller
                        name={`experience.${index}.current`}
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label className="text-sm">Currently working here</Label>
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      {...register(`experience.${index}.description`)}
                      placeholder="Describe your role and achievements..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Skills
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSkillDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillsValue?.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="flex items-center gap-2 bg-[#F3F4F6] text-[#374151] px-3 py-1"
                  >
                    {skill.name}
                    <span className="text-xs text-[#6B7280]">({skill.level})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Web3 Credentials */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Web3 Credentials
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendCredential({
                    id: Date.now().toString(),
                    type: 'Certificate',
                    title: '',
                    issuer: '',
                    date: '',
                    description: ''
                  })}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Credential
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {credentialFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-gray-700">Credential {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteTarget({ type: 'credential', id: field.id });
                        setShowDeleteDialog(true);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Type</Label>
                      <select
                        {...register(`credentials.${index}.type`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Certificate">Certificate</option>
                        <option value="NFT">NFT</option>
                        <option value="POAP">POAP</option>
                        <option value="Badge">Badge</option>
                      </select>
                    </div>
                    <div>
                      <Label>Title *</Label>
                      <Input
                        {...register(`credentials.${index}.title`, { required: true })}
                      />
                    </div>
                    <div>
                      <Label>Issuer *</Label>
                      <Input
                        {...register(`credentials.${index}.issuer`, { required: true })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="month"
                        {...register(`credentials.${index}.date`)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        {...register(`credentials.${index}.description`)}
                        className="min-h-[60px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>ENS Name</Label>
                  <Input
                    {...register('ensName')}
                    placeholder="yourname.eth"
                  />
                </div>
                <div>
                  <Label>Wallet Address</Label>
                  <Input
                    {...register('walletAddress')}
                    placeholder="0x..."
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Social Links</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendSocial({
                      id: Date.now().toString(),
                      platform: '',
                      url: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Link
                  </Button>
                </div>
                <div className="space-y-3">
                  {socialFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <select
                        {...register(`socialLinks.${index}.platform`)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Platform</option>
                        <option value="GitHub">GitHub</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Discord">Discord</option>
                        <option value="Telegram">Telegram</option>
                      </select>
                      <Input
                        {...register(`socialLinks.${index}.url`)}
                        placeholder="https://..."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDeleteTarget({ type: 'social', id: field.id });
                          setShowDeleteDialog(true);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Public Profile</Label>
                  <p className="text-sm text-gray-600">Make your profile visible to everyone</p>
                </div>
                <Controller
                  name="publicProfile"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Show Wallet Address</Label>
                  <p className="text-sm text-gray-600">Display your wallet address on profile</p>
                </div>
                <Controller
                  name="showWallet"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Show Credentials</Label>
                  <p className="text-sm text-gray-600">Display your Web3 credentials publicly</p>
                </div>
                <Controller
                  name="showCredentials"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Add Skill Dialog */}
        <Dialog open={showSkillDialog} onOpenChange={setShowSkillDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Skill Name</Label>
                <Input
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Solidity, React, Web3.js"
                />
              </div>
              <div>
                <Label>Proficiency Level</Label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSkillDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSkill} disabled={!newSkill.name.trim()}>
                Add Skill
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileEditPage;