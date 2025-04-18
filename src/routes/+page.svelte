<script lang="ts">
  const props = $props<{ data: any }>();
  // data.books is provided by +page.server.ts
</script>

<!-- List of books in the sidebar is handled by the root layout. -->
<!-- Main content area shows a welcome message until a book is selected. -->

<div class="max-w-[980px] mx-auto font-roboto">
  <h1 class="text-4xl font-bold mb-8">Welcome to the Book Reader</h1>
  
  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Select a book from the sidebar to begin reading.
    </p>
    
    <p class="text-gray-600 dark:text-gray-400">
      This application contains {props.data?.books?.length || 0} books available for reading.
    </p>
  </div>
</div>
