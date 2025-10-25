const sendSignature = async (signaturePad, prefix = "no_업체명" + new Date()) => {
  const dataURL = signaturePad.toDataURL("image/png");
  const blob = await (await fetch(dataURL)).blob();

  const formData = new FormData();
  const signFileName = prefix + "_signature.png";

  formData.append("file", blob, `${signFileName}`);

  const fileDTO = await fetch(`${ORIGIN}/upload`, {
    method: "POST",
    body: formData,
  });

  return await fileDTO.json();
};
