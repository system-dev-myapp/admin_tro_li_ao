export default function handleValidateImage(file) {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.name);
}

export function handleValidateFile(file) {
    return /\.(pdf|doc|docx|xlsx)$/i.test(file.name);
}
