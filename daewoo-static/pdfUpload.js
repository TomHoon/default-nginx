const uploadPdf = async (pdf, prefix = "no_업체명" + new Date()) => {
  const pdfBlob = new Blob([pdf.output("arraybuffer")], {type: "application/pdf"});
  const formData = new FormData();

  const pdfName = prefix + "_form.pdf";

  formData.append("file", pdfBlob, pdfName);

  const res = await fetch(`${ORIGIN}/upload`, {
    method: "POST",
    body: formData,
  });

  const pdfDTO = await res.json();
  console.log("pdfDTO ", pdfDTO);
  return pdfDTO;
};
