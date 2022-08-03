export const createSnippet = async (formData) => {
  try {
    await fetch("/api/snippets", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
  } catch (e) {
    console.error(e)
  }
};
