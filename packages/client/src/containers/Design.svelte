<script lang="ts">
  import { fetchInStore, fetchJson } from '$lib/network'

  import {
    Button,
    CodeSnippet,
    Column,
    DataTable,
    Grid,
    InlineNotification,
    OverflowMenu,
    OverflowMenuItem,
    Row,
    TextInput,
    Toolbar,
    ToolbarContent,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarSearch,
  } from 'carbon-components-svelte'

  import AddAlt16 from 'carbon-icons-svelte/lib/AddAlt16'
  import ModalAlert from '$components/ModalAlert.svelte'

  let {
    data,
    error,
    resetError,
    exec: reloadTables,
  } = fetchInStore<{ id: string; name: string; description: string }[]>('/api/design/tables')

  let selectedRowIds = []

  let openModalAddTable = false
  let openModalConfirm = false
  let selectedRow

  let addTableData = {
    name: '',
    description: '',
  }

  async function sendAddTableForm() {
    await fetchJson('/api/design/tables', addTableData, 'POST')
    reloadTables()
    openModalAddTable = false
  }

  async function sendDeleteTableForm() {
    await fetchJson('api/design/tables/' + selectedRow?.id, {}, 'DELETE')
    reloadTables()
    openModalConfirm = false
  }

  function openModalAdd() {
    addTableData = {
      name: '',
      description: '',
    }
    openModalAddTable = true
  }
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
        bind:selectedRowIds
      >
        <span slot="cell" let:cell let:row>
          {#if cell.key === 'overflow'}
            <OverflowMenu flipped>
              <OverflowMenuItem text="Open" />
              <OverflowMenuItem text="Copy" />
              <OverflowMenuItem
                on:click={() => ((openModalConfirm = true), (selectedRow = row))}
                danger
                text="Delete"
              />
            </OverflowMenu>
          {:else}{cell.value}{/if}
        </span>
        <Toolbar>
          <ToolbarContent>
            <ToolbarSearch />
            <ToolbarMenu>
              <ToolbarMenuItem>Download</ToolbarMenuItem>
            </ToolbarMenu>
            <Button on:click={openModalAdd} icon={AddAlt16}>Add</Button>
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
        {@html "&#60;script&#62;\n\timport { Table } from 'svelte-db-manager';\n&#60;/script&#62;\n&#60;Table " +
          (selectedRowIds.length == 1 ? ' id={' + selectedRowIds[0] + '}' : '') +
          '/&#62;'}
      </CodeSnippet>
    </Column>
  </Row>
</Grid>

<ModalAlert
  bind:openModal={openModalAddTable}
  on:confirm={sendAddTableForm}
  title="Add new table"
  on:cancel={() => (openModalAddTable = false)}
>
  <div slot="body">
    <TextInput labelText="Name" bind:value={addTableData.name} />
    <TextInput labelText="Description" bind:value={addTableData.description} />
  </div>
</ModalAlert>

<ModalAlert
  bind:openModal={openModalConfirm}
  on:confirm={sendDeleteTableForm}
  on:cancel={() => (openModalConfirm = false)}
>
  <div slot="body">
    <TextInput labelText="Name" readonly value={selectedRow?.name} />
    <TextInput labelText="Description" readonly value={selectedRow?.description} />
  </div>
</ModalAlert>
