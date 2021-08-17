<script lang="ts">
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
  } from 'carbon-components-svelte'
  import UserAvatarFilled20 from 'carbon-icons-svelte/lib/UserAvatarFilled20'

  let isSideNavOpen = false
  let isOpen = false
</script>

<Header company="DB Manager 2" platformName="with ease" bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderAction bind:isOpen icon={UserAvatarFilled20}>
      <HeaderPanelLinks>
        <HeaderPanelLink>Profile</HeaderPanelLink>
        <HeaderPanelLink>Settings</HeaderPanelLink>
        <HeaderPanelLink>Logout</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="Tables" />
    <SideNavLink text="Validators/Transformations" />
    <SideNavLink text="Authorizations" />
    <SideNavLink text="Embed" />
    <SideNavLink text="APIs" />
  </SideNavItems>
</SideNav>

<Content>
  <Grid>
    <Row>
      <Column>
        <h1>Welcome</h1>
      </Column>
    </Row>
  </Grid>
</Content>
