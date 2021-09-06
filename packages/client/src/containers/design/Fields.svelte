<script lang="ts">
  import { fetchInStore } from '$lib/network'
  import type { Field } from '$server/schema'
  import { Column, DataTable, Grid, Row } from 'carbon-components-svelte'

  export let tableID: string

  let { data, error, resetError, exec: reload } = fetchInStore<Field[]>(`/api/design/tables/${tableID}/fields`, true)
  $: if (tableID) {
    reload()
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
          { key: 'key', value: 'Is key' },
          { key: 'mandatory', value: 'Mandatory' },
          { key: 'type', value: 'Type' },
          { key: 'length', value: 'Length' },
          { key: 'default', value: 'Default' },
        ]}
        rows={$data || []}
      />
    </Column>
  </Row>
</Grid>
