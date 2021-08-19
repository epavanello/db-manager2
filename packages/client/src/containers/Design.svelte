<script lang="ts">
  import fetchInStore from '$lib/fetchInStore'

  import {
    Button,
    CodeSnippet,
    Column,
    DataTable,
    Grid,
    InlineLoading,
    InlineNotification,
    OverflowMenu,
    OverflowMenuItem,
    Row,
    Toolbar,
    ToolbarBatchActions,
    ToolbarContent,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarSearch,
  } from 'carbon-components-svelte'

  import FolderOpen16 from 'carbon-icons-svelte/lib/FolderOpen16'
  import Copy16 from 'carbon-icons-svelte/lib/Copy16'
  import Delete16 from 'carbon-icons-svelte/lib/Delete16'

  let {
    data,
    loading,
    error,
    resetError,
    exec: update,
  } = fetchInStore<{ id: string; name: string; description: string }[]>('api/design/tables')

  let selectedRowIds = []

  $: console.log(selectedRowIds)
</script>

<Grid>
  <Row>
    <Column>
      <h1 class="mb-6 text-2xl">Design tables</h1>
      <DataTable
        headers={[
          { key: 'name', value: 'Name' },
          { key: 'description', value: 'Description' },
          { key: 'overflow', empty: true },
        ]}
        rows={$data}
        batchSelection
        bind:selectedRowIds
      >
        <span slot="cell" let:cell>
          {#if cell.key === 'overflow'}
            <OverflowMenu flipped>
              <OverflowMenuItem text="Open" />
              <OverflowMenuItem text="Copy" />
              <OverflowMenuItem danger text="Delete" />
            </OverflowMenu>
          {:else}{cell.value}{/if}
        </span>
        <Toolbar>
          <ToolbarBatchActions>
            {#if selectedRowIds.length == 1}
              <Button icon={FolderOpen16}>Open</Button>
              <Button icon={Copy16}>Copy</Button>
            {/if}
            <Button icon={Delete16}>Delete</Button>
          </ToolbarBatchActions>
          <ToolbarContent>
            <ToolbarSearch />
            <ToolbarMenu>
              <ToolbarMenuItem>Download</ToolbarMenuItem>
            </ToolbarMenu>
            <Button on:click={update}>
              {#if $loading}
                <InlineLoading />
              {:else}
                Update
              {/if}
            </Button>
          </ToolbarContent>
        </Toolbar>
      </DataTable>
      {#if $error}
        <InlineNotification kind="error" title="Error" subtitle={$error} on:close={resetError} />
      {/if}
      <h2 class="my-6 text-2xl">Usage</h2>

      <p class="my-2">Add package</p>
      <CodeSnippet code="yarn add svelte-db-manager" />

      <p class="my-2">Use inside your codebase</p>
      <CodeSnippet expanded type="multi">
        {@html "&#60;script&#62;\n\timport { Table } from 'svelte-db-manager';\n&#60;/script&#62;\n&#60;Table id={" +
          selectedRowIds[0] +
          '}/&#62;'}
      </CodeSnippet>
    </Column>
  </Row>
</Grid>
