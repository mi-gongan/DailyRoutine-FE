import { Formidable } from "formidable";

export async function getImage(formData) {
  const data = await new Promise(function (resolve, reject) {
    const form = new Formidable();
    form.parse(formData, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  return (data as any).files.image;
}
