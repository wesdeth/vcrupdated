import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface ProfileCardProps {
  name: string
  handle: string
  bio: string
  avatar: string
  profileUrl: string
  roles: Array<{
    name: string
    color: string
    icon?: string
  }>
}

const ProfileCard = ({ name, handle, bio, avatar, profileUrl, roles }: ProfileCardProps) => {
  return (
    <a
      href={profileUrl}
      className="group block bg-white rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <Image
            src={avatar}
            alt={`${name} profile`}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          {roles.length > 0 && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: roles[0].color }}>
              {roles[0].icon ? (
                <Image src={roles[0].icon} alt={roles[0].name} width={12} height={12} />
              ) : (
                roles[0].name.charAt(0).toUpperCase()
              )}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-lg text-primary-text truncate">{name}</h3>
            <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <p className="text-sm text-secondary-text mb-2 truncate">{handle}</p>
          
          <p className="text-sm text-secondary-text line-clamp-2 mb-3">{bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {roles.map((role, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-medium text-white"
                style={{ backgroundColor: role.color }}
              >
                {role.icon && (
                  <Image src={role.icon} alt={role.name} width={12} height={12} className="mr-1" />
                )}
                {role.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}

export default function ProfileGrid() {
  const profiles = [
    {
      name: 'luc',
      handle: 'luc.eth',
      bio: 'Create Epic Shit, DevRel @ ENS, Researcher @ V3X',
      avatar: 'https://gateway.pinata.cloud/ipfs/bafkreifnrjhkl7ccr2ifwn2n7ap6dh2way25a6w5x2szegvj5pt4b5nvfu',
      profileUrl: 'https://web3.bio/luc.eth',
      roles: [
        { name: 'Engineer', color: '#4F46E5' },
        { name: 'Researcher', color: '#8B5CF6' }
      ]
    },
    {
      name: 'sio.eth',
      handle: '0xd5fb...24f5',
      bio: 'Product Designer at Aragon ⟡ Cyclist ⟡ Music Nerd',
      avatar: 'https://cdn.simplehash.com/assets/966476fc90b72b1369eb0f301f1448789ec66915cdf99631f39099269c72d043.png',
      profileUrl: 'https://web3.bio/sio.eth',
      roles: [
        { name: 'Designer', color: '#F59E0B' }
      ]
    },
    {
      name: 'vitalik.eth',
      handle: '0xd8da...6045',
      bio: 'mi pinxe lo crino tcati',
      avatar: 'https://euc.li/vitalik.eth',
      profileUrl: 'https://web3.bio/vitalik.eth',
      roles: [
        { name: 'Builder', color: '#10B981' },
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'nick.eth',
      handle: '0xb8c2...67d5',
      bio: 'Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him.',
      avatar: 'https://cdn.simplehash.com/assets/102401925f00ab7f22572eb5c91a97930b87864cd61f0546c8974aee6e7ce7bc.png',
      profileUrl: 'https://web3.bio/nick.eth',
      roles: [
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'Brantly Millegan',
      handle: 'brantly.eth',
      bio: 'Catholic, husband, father | building @efp.eth | ENS (DAO delegate, former core team) | Sign-in with Ethereum (creator)',
      avatar: 'https://euc.li/brantly.eth',
      profileUrl: 'https://web3.bio/brantly.eth',
      roles: [
        { name: 'Builder', color: '#10B981' }
      ]
    },
    {
      name: 'wijuwiju.eth',
      handle: '0xf484...b4fc',
      bio: 'initial contributor at interfacelabs.eth 🐙',
      avatar: 'https://gateway.pinata.cloud/ipfs/QmTRvykkH977kSmCRsfqvVsa4Kr7hJPh6YZVQzuQfjZqM4',
      profileUrl: 'https://web3.bio/wijuwiju.eth',
      roles: [
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'mely.eth',
      handle: '0x2a59...79bf',
      bio: 'Web3\'s Chief Amazement Officer',
      avatar: 'https://euc.li/mely.eth',
      profileUrl: 'https://web3.bio/mely.eth',
      roles: [
        { name: 'Marketer', color: '#F59E0B' }
      ]
    },
    {
      name: 'Venkatesh Rao ☀️',
      handle: 'vgr',
      bio: 'Blogger at ribbonfarm.com, running summerofprotocols.com, host of /gloom ☀️',
      avatar: 'https://i.seadn.io/gae/T-nT2JPzx2mx6bLRETolnn8Vc-D8vdUqDz5vrSPZPIcu5xjFMtIC3qmfU2Kqjfj9W0fNDxVSJQ-tggAWEsI38Gxw-Lxmw4H-osi6IA?w=500&auto=format',
      profileUrl: 'https://web3.bio/vgr.farcaster',
      roles: [
        { name: 'Writer', color: '#10B981' },
        { name: 'Social Media', color: '#F59E0B' }
      ]
    },
    {
      name: 'Dan Romero',
      handle: 'dwr.eth',
      bio: 'Working on Farcaster',
      avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/bc698287-5adc-4cc5-a503-de16963ed900/original',
      profileUrl: 'https://web3.bio/dwr.eth.farcaster',
      roles: [
        { name: 'Builder', color: '#10B981' }
      ]
    },
    {
      name: 'phil',
      handle: '0x925a...8b25',
      bio: 'Building /bright-moments - minting onchain art IRL | /purple #15 | FID 129 #magikarp',
      avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/ed5f4ac3-36ce-44e2-df81-0516b60b0600/original',
      profileUrl: 'https://web3.bio/phil.farcaster',
      roles: [
        { name: 'Builder', color: '#10B981' }
      ]
    },
    {
      name: 'ace',
      handle: '0xe978...80ca',
      bio: 'building @perl & @offmarket | fid #539 | resuming /cheesecoin once we hit pmf 🎯',
      avatar: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4e69a13e-7fe7-49fa-5885-6da6706a3000/original',
      profileUrl: 'https://web3.bio/ace.farcaster',
      roles: [
        { name: 'Builder', color: '#10B981' },
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'jesse.xyz',
      handle: '0x8491...8bf1',
      bio: '',
      avatar: 'https://s.gravatar.com/avatar/905fd6810cd184a461697d811a319272.jpg',
      profileUrl: 'https://web3.bio/jesse.xyz',
      roles: [
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'validator.eth',
      handle: '0x82eb...3dab',
      bio: 'validator.box validator.xyz',
      avatar: 'https://cdn.simplehash.com/assets/c908ed4589b88bff023f3e772e4db73813740d09d2e4ecf440861e8588c240c6.png',
      profileUrl: 'https://web3.bio/validator.eth',
      roles: [
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'drea.eth',
      handle: '0xeb6b...516a',
      bio: '',
      avatar: 'https://euc.li/drea.eth',
      profileUrl: 'https://web3.bio/drea.eth',
      roles: [
        { name: 'Designer', color: '#F59E0B' }
      ]
    },
    {
      name: 'limes.eth',
      handle: '0xa786...77c6',
      bio: 'ENS Steward & Secretary',
      avatar: 'https://euc.li/limes.eth',
      profileUrl: 'https://web3.bio/limes.eth',
      roles: [
        { name: 'Operations', color: '#8B5CF6' }
      ]
    },
    {
      name: 'jango.eth',
      handle: '0x823b...adad',
      bio: '',
      avatar: 'https://i.seadn.io/gcs/files/c90dc12049aec2c1d7175e9841d2d030.png?auto=format&w=1000',
      profileUrl: 'https://web3.bio/jango.eth',
      roles: [
        { name: 'Builder', color: '#10B981' }
      ]
    },
    {
      name: 'pugson.eth',
      handle: '0x96a7...fa23',
      bio: 'smooth brain operator',
      avatar: 'https://wojtek.im/face.jpg',
      profileUrl: 'https://web3.bio/pugson.eth',
      roles: [
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'Stani',
      handle: 'stani.lens',
      bio: '@Avara (@Aave @Lens @Family)',
      avatar: 'https://ik.imagekit.io/lens/media-snapshot/98e279526cad20389c0959c26059cc3fe7a35793e8e050b43802916ea0d42d33.png',
      profileUrl: 'https://web3.bio/stani.lens',
      roles: [
        { name: 'Executive', color: '#8B5CF6' },
        { name: 'Builder', color: '#10B981' }
      ]
    },
    {
      name: 'maaria.eth',
      handle: '0x8017...f071',
      bio: '',
      avatar: 'https://cdn.simplehash.com/assets/57d2999be736d61b5a9f9b96dd3de4b75d094a13f49a2f6e1fbff020d420c46b.png',
      profileUrl: 'https://web3.bio/maaria.eth',
      roles: [
        { name: 'Marketer', color: '#F59E0B' }
      ]
    },
    {
      name: 'ted (not lasso)',
      handle: 'ted',
      bio: '/ted | exploring the onchain frontier | surfing @ venice, ca | eating @ gjusta / gjelina',
      avatar: 'https://openseauserdata.com/files/fd28c65d9b5192168fb259009a3afd36.png',
      profileUrl: 'https://web3.bio/ted.farcaster',
      roles: [
        { name: 'Social Media', color: '#F59E0B' }
      ]
    },
    {
      name: 'Lola',
      handle: 'hazelstar.lens',
      bio: 'Design intern @aci | Always curious, sometimes bored, never basic |',
      avatar: 'https://ik.imagekit.io/lens/media-snapshot/c366d76811bab309457a7462b37590b39a29868d3f792b75f2ec08408d893306.png',
      profileUrl: 'https://web3.bio/hazelstar.lens',
      roles: [
        { name: 'Designer', color: '#F59E0B' }
      ]
    },
    {
      name: 'Marc Zeller',
      handle: 'aavechan.lens',
      bio: '',
      avatar: 'https://ik.imagekit.io/lens/media-snapshot/5960025caaa7541a28c46bc54771c15614fac316b204c104cb0b2b4dc26915a1.png',
      profileUrl: 'https://web3.bio/aavechan.lens',
      roles: [
        { name: 'Executive', color: '#8B5CF6' }
      ]
    },
    {
      name: 'Edward Tay',
      handle: 'edwardtay.lens',
      bio: 'Chains, Coins, dApps, DAOs. | Consumer of dark roast hazelnut latte. https://edwardtay.com / https://edwardtay.eth.xyz',
      avatar: 'https://ik.imagekit.io/lens/media-snapshot/9c45d91650422fb298d0237679cbcf308493e21a106518afe306eda160c70633.png',
      profileUrl: 'https://web3.bio/edwardtay.lens',
      roles: [
        { name: 'Builder', color: '#10B981' },
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'Shane da Silva',
      handle: 'sds',
      bio: 'Building @farcaster. Previously Coinbase, Brigade, Causes.',
      avatar: 'https://i.seadn.io/gae/8gYoPP2mTxWhth4f4NZSQjaIBq0WTQWhwpJB3Cl8YvK3dUwoOLDxCSlUMQrkdM-mb3HNRmY_7xmIxARAEEjgxlXIrgj5nFp3ithB?w=500&auto=format',
      profileUrl: 'https://web3.bio/sds.farcaster',
      roles: [
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'Christina',
      handle: 'christina.lens',
      bio: '⌐◨-◨ Stay curious 🌎 // Non technical engineer // Head of Growth @LensProtocol // Building the future of social 📖: Working in Public',
      avatar: 'https://ik.imagekit.io/lens/media-snapshot/1d575dc64321b54eb5803b538c142386d2ec968f0c0ee47e4dbe901ced7917bf.png',
      profileUrl: 'https://web3.bio/christina.lens',
      roles: [
        { name: 'Marketer', color: '#F59E0B' }
      ]
    },
    {
      name: 'Crit',
      handle: 'crittie.lens',
      bio: 'here for music and memes',
      avatar: 'https://ik.imagekit.io/lens/media-snapshot/e04b7e7bc1438679ac11e4d364611c550135adc248e1ef50e10aa13268194389.png',
      profileUrl: 'https://web3.bio/crittie.lens',
      roles: [
        { name: 'Social Media', color: '#F59E0B' }
      ]
    },
    {
      name: 'tate',
      handle: 'taytems.eth',
      bio: 'professional gamer',
      avatar: 'https://gateway.pinata.cloud/ipfs/QmR6SxBfMEas7SB5KaRHd4ZrBzCeVjMrpn6fAMZZpbdojQ',
      profileUrl: 'https://web3.bio/taytems.eth',
      roles: [
        { name: 'Gaming', color: '#8B5CF6' }
      ]
    },
    {
      name: '0xdesigner.eth',
      handle: '0xabb4...d007',
      bio: '',
      avatar: 'https://euc.li/0xdesigner.eth',
      profileUrl: 'https://web3.bio/0xdesigner.eth',
      roles: [
        { name: 'Designer', color: '#F59E0B' }
      ]
    },
    {
      name: 'garypalmerjr.eth',
      handle: '0x4d98...e5a8',
      bio: 'Web3Domains.com 👁️☰ #ENS Protocol Advocate $ENS Delegate ⦅⦆ #BAYC 3636 🦍 #GiftGoat V1 🐐 GET VISIBLE & HELP OTHERS—UCC 1-308 🛸 Dc/acc.',
      avatar: 'https://cdn.simplehash.com/assets/ae0dd17cb5349ba2133986fd0655835328b474166c4777ca907b4a29a8339a16.png',
      profileUrl: 'https://web3.bio/garypalmerjr.eth',
      roles: [
        { name: 'Marketer', color: '#F59E0B' }
      ]
    },
    {
      name: 'smith.box',
      handle: '0x71ab...7040',
      bio: '',
      avatar: 'https://euc.li/30315.eth',
      profileUrl: 'https://web3.bio/smith.box',
      roles: [
        { name: 'Builder', color: '#10B981' }
      ]
    },
    {
      name: 'VCR Platform',
      handle: 'vcr.eth',
      bio: 'Verified Chain Resume - The premier professional network for Web3. Connect, collaborate, and build the future of decentralized technology.',
      avatar: 'https://euc.li/web3.bio',
      profileUrl: '/profile',
      roles: [
        { name: 'Platform', color: '#4F46E5' }
      ]
    },
    {
      name: '184.eth',
      handle: '0xc28d...020d',
      bio: 'ENS Labs Support Lead | ENS DAO Ecosystem Working Group Steward |',
      avatar: 'https://euc.li/184.eth',
      profileUrl: 'https://web3.bio/184.eth',
      roles: [
        { name: 'Support', color: '#10B981' }
      ]
    },
    {
      name: 'matoken.eth',
      handle: '0x5a38...0615',
      bio: '',
      avatar: 'https://cdn.simplehash.com/assets/8a227c939b0cf152deaad3e11df1508bb85a458218ada4f16df6134b911ad471.png',
      profileUrl: 'https://web3.bio/matoken.eth',
      roles: [
        { name: 'Engineer', color: '#4F46E5' }
      ]
    },
    {
      name: 'barmstrong.eth',
      handle: '0x5b76...a1f0',
      bio: 'Coinbase CEO. Increasing economic freedom for the world.',
      avatar: 'https://euc.li/barmstrong.eth',
      profileUrl: 'https://web3.bio/barmstrong.eth',
      roles: [
        { name: 'Executive', color: '#8B5CF6' }
      ]
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-primary-text mb-4">
            VCR Professional Profiles
          </h2>
          <p className="text-lg text-secondary-text">
            One comprehensive profile to showcase your Web3 professional identity and achievements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile, index) => (
            <ProfileCard key={index} {...profile} />
          ))}
        </div>
      </div>
    </section>
  )
}