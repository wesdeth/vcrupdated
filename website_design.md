<high_level_design>
1. **Brand & Art Direction Overview**
   Web3.bio features a modern, clean tech aesthetic with a soft gradient background transitioning from light beige/cream to pale blue. The design emphasizes Web3 identity with colorful platform badges, rounded corners, and minimalist spacing. The overall feel is professional yet approachable, perfect for a Web3 identity platform.

2. **Color Palette** (Clone Exactly)
   | Token | HEX / RGB | Usage | Notes |
   |-------|-----------|-------|-------|
   | Background Gradient Start | #F5F1EB | Top of page gradient | Warm beige tone |
   | Background Gradient End | #E6F2FF | Bottom of page gradient | Light blue tone |
   | Primary Text | #1A1A1A | Main headings and body text | Dark charcoal |
   | Secondary Text | #666666 | Subheadings and descriptions | Medium gray |
   | Card Background | #FFFFFF | Profile cards and sections | Pure white with transparency |
   | Platform Blue | #4F46E5 | ENS platform badge | Primary blue accent |
   | Platform Purple | #8B5CF6 | Farcaster platform badge | Purple accent |
   | Platform Green | #10B981 | Lens platform badge | Teal green accent |
   | Platform Orange | #F59E0B | Various platform badges | Orange accent |
   | Search Border | #E5E7EB | Search input border | Light gray border |

3. **Typography Scale** (Clone Exactly)
   * Main Logo: Custom "WEB3.BIO" text with stylized backslashes
   * Primary Heading: ~32px, semi-bold, "Web3 Identity Search"
   * Secondary Heading: ~24px, semi-bold, section titles
   * Body Text: ~16px, regular weight, descriptions
   * Profile Names: ~18px, medium weight
   * Platform Tags: ~14px, medium weight in colored badges

4. **Spacing & Layout Grid** (Clone Exactly)
   * Container max-width: ~1200px, centered
   * Section vertical spacing: 80px
   * Card spacing: 24px gaps in grid
   * Internal padding: 24px for cards, 16px for smaller elements
   * Search bar: Full width with 16px padding

5. **Visual Effects & Treatments** (Clone Exactly)
   * Gradient background: Linear from top-left to bottom-right
   * Card shadows: Soft drop shadows with blur
   * Border radius: 12px for cards, 8px for buttons/badges
   * Platform badges: Colorful rounded rectangles with white text
   * Profile images: Circular with subtle shadows
   * Hover effects: Subtle scale and shadow changes

6. **Component Styles** (Clone Exactly)
   * Search bar: White background, rounded, with search icon
   * Profile cards: White background, rounded corners, profile image, name, handle, bio
   * Platform badges: Small colored rectangles with platform icons
   * Trending tags: Clickable blue links with platform indicators
   * Social links: Icon-based navigation in header

7. **Site sections** (Clone Exactly)
   * Header with logo and navigation links
   * Hero section with main title and search functionality
   * Trending section with popular profiles
   * Feature overview section
   * Identity search support section
   * Visualize identity graph section
   * Web3 link-in-bio profile grid
   * Footer with social links and legal info
</high_level_design>

<sections>
<clone_section>
<file_path>src/components/sections/Header.tsx</file_path>
<design_instructions>
Clone the header section with the Web3.bio logo on the left (stylized "WEB3\BIO" text with backslashes) and navigation menu on the right including "Back to Home", "Brand & Logo", and social media icons (Twitter/X, GitHub, Telegram, Farcaster, Lens) with proper spacing and styling.
</design_instructions>
</clone_section>

<clone_section>
<file_path>src/components/sections/Hero.tsx</file_path>
<design_instructions>
Clone the hero section with gradient background, main heading "Web3 Identity Search", subtitle "Dive into the Web3 Identity Graph and Profiles", search input field with placeholder text, and trending links section showing popular profiles like "vitalik.eth", "0xd8da...6045", etc. with platform badges.
</design_instructions>
</clone_section>

<clone_section>
<file_path>src/components/sections/Features.tsx</file_path>
<design_instructions>
Clone the features overview section with the main heading "Explore Web3 identities" followed by platform badges (Ethereum, Farcaster, Lens) "and crypto domains" with domain badges (ENS, Basenames, etc.) "in a whole new informative way" and the "With Web3.bio you can:" subheading.
</design_instructions>
</clone_section>

<clone_section>
<file_path>src/components/sections/IdentitySearch.tsx</file_path>
<design_instructions>
Clone the "Identity Search Support" section with heading, description "Search for Web3 identities with these domains and accounts", and list of supported platforms including Ethereum Name Service, Farcaster, Lens, Unstoppable Domains, and SPACE ID with their respective icons.
</design_instructions>
</clone_section>

<clone_section>
<file_path>src/components/sections/IdentityGraph.tsx</file_path>
<design_instructions>
Clone the "Visualize Identity Graph" section with heading, description "Deep dive into Web3 identities and connections across digital space", and a "Visualize" button or link with appropriate styling.
</design_instructions>
</clone_section>

<clone_section>
<file_path>src/components/sections/ProfileGrid.tsx</file_path>
<design_instructions>
Clone the "Web3 Link-in-Bio Profile" section with heading, description "One page to show who you are and everything you make and own", and the grid of profile cards showing various Web3 identities like luc.eth, sio.eth, vitalik.eth, nick.eth, etc. Each card should include profile image, display name, handle/address, bio text, and platform badges.
</design_instructions>
</clone_section>

<clone_section>
<file_path>src/components/sections/Footer.tsx</file_path>
<design_instructions>
Clone the footer section with centered social media icons (Twitter/X, GitHub, Farcaster, Telegram) and legal links including "Web3.bio project crafted with ❤️ All", "Terms", "Privacy", "Brand", "DMCA" with proper spacing and styling on the gradient background.
</design_instructions>
</clone_section>
</sections>