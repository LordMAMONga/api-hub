export const downloadImageLocally = async (url: string, filename: string) => {
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;

    const response = await fetch(proxyUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "wallpaper.jpg";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Ошибка при скачивании:", error);
    alert("Не удалось скачать изображение :(");
  }
};
