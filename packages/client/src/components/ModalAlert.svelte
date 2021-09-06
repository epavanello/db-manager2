<script lang="ts">
  import { Form, Modal, TextInput } from 'carbon-components-svelte'
  import { createEventDispatcher } from 'svelte';

  // KEY
  export let openModal = false;
  export let title = "Are you sure?";
  export let primaryButtonText = "Confirm";
  export let secondaryButtonText = "Cancel";
  export let labelText = "Value";
  export let labelValue = "";
  
  const dispatch = createEventDispatcher();

  function confirm() {
    dispatch('confirm', {})
  }

  function cancel() {
    dispatch('cancel', {})
  }
</script>

<Modal
  bind:open={openModal}
  modalHeading={title}
  {primaryButtonText}
  {secondaryButtonText}
  on:click:button--primary={() => confirm()}
  on:click:button--secondary={() => cancel()}
  on:open
  size="xs"
>
  <Form class="grid grid-cols-1 gap-8">
    <slot name="body">
      <TextInput labelText={labelText} readonly value={labelValue} />
    </slot>
  </Form>
</Modal>
