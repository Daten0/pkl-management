export const LOGBOOK_IMAGE_ACCEPT = '.jpg,.jpeg,.png,image/jpeg,image/png';
export const LOGBOOK_IMAGE_ERROR = 'Dokumentasi harus berupa gambar JPEG atau PNG.';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png'];
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export function isValidLogbookImage(file: File): boolean {
	const extension = file.name.split('.').pop()?.toLowerCase();

	if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
		return false;
	}

	return file.type === '' || ALLOWED_MIME_TYPES.includes(file.type);
}
