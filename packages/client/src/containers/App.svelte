<script lang="ts">
  import TailwindCSS from '$lib/TailwindCSS.svelte'

  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
    Content,
  } from 'carbon-components-svelte'
  import UserAvatarFilled20 from 'carbon-icons-svelte/lib/UserAvatarFilled20'

  import { Router, Link, Route } from 'svelte-routing'
  import Manage from './Manage.svelte'
  import Design from './Design.svelte'

  let isSideNavOpen = false
  let isOpen = false

  let url = ''
</script>

<TailwindCSS />

<Router {url}>
  <Header company="DB Manager 2" platformName="with ease" bind:isSideNavOpen>
    <div slot="skip-to-content">
      <SkipToContent />
    </div>
    <HeaderUtilities>
      <HeaderAction bind:isOpen icon={UserAvatarFilled20} class="flex flex-row items-center justify-center">
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
      <Link to="/design">
        <SideNavLink text="Design" isSelected={url == '/design'} />
      </Link>
      <Link to="/manage">
        <SideNavLink text="Manage" isSelected={url == '/manage'} />
      </Link>
      <SideNavLink text="Validators/Transformations" />
      <SideNavLink text="Authorizations" />
      <SideNavLink text="Embed" />
      <SideNavLink text="APIs" />
    </SideNavItems>
  </SideNav>

  <Content>
    <Route path="design" component={Design} />
    <Route path="manage" component={Manage} />
  </Content>
</Router>
