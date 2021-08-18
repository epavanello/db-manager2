<script lang="ts">
  import fetchInStore from '$lib/fetchInStore'

  import {
    Button,
    Column,
    DataTable,
    Grid,
    InlineLoading,
    Row,
    Toolbar,
    ToolbarContent,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarSearch,
  } from 'carbon-components-svelte'

  let {
    data,
    loading,
    exec: update,
  } = fetchInStore<{ id: string; name: string; description: string }[]>('api/design/tables')
</script>

<Grid>
  <Row>
    <Column>
      <h1>Design tables</h1>
      <DataTable
        headers={[
          { key: 'name', value: 'Name' },
          { key: 'description', value: 'Description' },
        ]}
        rows={$data}
      >
        <Toolbar>
          <ToolbarContent>
            <ToolbarSearch />
            <ToolbarMenu>
              <ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
              <ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
                API documentation
              </ToolbarMenuItem>
              <ToolbarMenuItem danger>Stop all</ToolbarMenuItem>
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
    </Column>
  </Row>
</Grid>
