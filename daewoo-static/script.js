const ORIGIN = location.origin.includes("localhost") ? "http://localhost:33000" : "/api";

const STATIC_ORIGIN = location.origin.includes("localhost")
  ? "http://localhost:33000"
  : "https://daewoo.digital";

const sendEmail = async () => {
  const emails = [RECEIVER, "gnsdl9108@naver.com", "dwittt@naver.com"];

  const param = {
    // email: RECEIVER,
    message: "취업캠프 참여신청서가 접수되었습니다.",
    // pdf_name: `참여신청서_${data.company || "기업"}.pdf`,
    pdf_name: EMAIL_PARAM.pdfPath,
    csv_name: EMAIL_PARAM.signaturePath,
    company: EMAIL_PARAM.companyName,
  };

  try {
    for (let mailAddress of emails) {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {email: mailAddress, ...param});
    }

    STATUS.textContent = "이메일 발송 완료!";
    STATUS.style.color = "#16a34a";
  } catch (err) {
    console.error(err);
    STATUS.textContent = "이메일 발송 오류: EmailJS 설정을 확인하세요.";
    STATUS.style.color = "#dc2626";
  }
};

// ====== EmailJS 설정 (반드시 바꾸세요) ======
const SERVICE_ID = "service_ewe2eo7";
const TEMPLATE_ID = "template_i9cxg0b";
const PUBLIC_KEY = "sZXjnH_zhtqaHVg6l";
// const RECEIVER    = 'dwittt@naver.com';
const RECEIVER = "gnsdl9079@gmail.com";
emailjs.init({publicKey: PUBLIC_KEY});

const STATUS = document.getElementById("status");
let EMAIL_PARAM = {
  signaturePath: "",
  pdfPath: "",
  companyName: "",
};
// ====== Signature Pad 설정 ======
const canvas = document.getElementById("sigCanvas");
function resizeCanvas(e) {
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
}
// 초기 높이 설정
canvas.style.height = "200px";
canvas.style.width = "100%";
resizeCanvas();

let lastHeight = window.innerHeight;
window.addEventListener("resize", () => {
  const diff = Math.abs(window.innerHeight - lastHeight);
  if (diff < 100) return;
  lastHeight = window.innerHeight;
  resizeCanvas();
  resizeCanvas();
});

const sigPad = new SignaturePad(canvas, {
  backgroundColor: "rgba(255,255,255,1)",
  penColor: "#111827",
});

document.getElementById("btnClear").addEventListener("click", () => sigPad.clear());

// ====== 도우미 ======
function v(id) {
  return document.getElementById(id).value.trim();
}
function checked(id) {
  return document.getElementById(id).checked;
}
async function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

// ====== 제출 처리: PDF + CSV 생성 후 메일 전송 ======
document.getElementById("btnSubmit").addEventListener("click", async () => {
  STATUS.textContent = "생성 중...";

  // 1) 수집 데이터
  const data = {
    company: v("company"),
    ceo: v("ceo"),
    // address: v("address"),
    homepage: v("homepage"),
    // industry: v("industry"),
    bizno: v("bizno"),
    // employees: v("employees"),
    // founded: v("founded"),
    // phone: v("phone"),
    // fax: v("fax"),
    manager: v("manager"),
    mobile: v("mobile"),
    // email: v("email"),
    // department: v("department"),
    education: v("education"),
    hireCount: v("hireCount"),
    // employmentType: v("employmentType"),
    location: v("location"),
    // workHours: v("workHours"),
    salaryType: v("salaryType"),
    salary: v("salary"),
    retirement: checked("retirement") ? "Y" : "N",
    jobDesc: v("jobDesc"),
    // qualification: v("qualification"),
    preference: v("preference"),
    // etc: v("etc"),
  };

  // 2) PDF 생성
  const {jsPDF} = window.jspdf;
  const pdf = new jsPDF({unit: "pt", format: "a4"});

  let y = 60;
  const x = 50;

  pdf.setFont("NanumGothic", "normal");
  pdf.text("2025년도 기업과 함께하는 디지털 신기술 맞춤형 취업캠프 참여신청서", x, y);

  y += 20;
  const add = (label, value) => {
    pdf.text(`${label}: ${value || ""}`, x, y);
    y += 20;
  };
  add("업체명", data.company);
  add("대표자", data.ceo);
  add("회사주소", data.address);
  add("홈페이지", data.homepage);
  add("업종", data.industry);
  add("사업자등록번호", data.bizno);
  add("종업원수", data.employees);
  add("설립일", data.founded);
  add("대표전화", data.phone);
  add("FAX", data.fax);
  add("담당자명", data.manager);
  add("전화/핸드폰", data.mobile);
  add("메일", data.email);
  y += 10;

  pdf.text("- 채용조건 -", x, y);
  y += 15;
  add("모집부문", data.department);
  add("학력", data.education);
  add("채용인원수", data.hireCount);
  add("고용형태", data.employmentType);
  add("근무지역", data.location);
  add("근무시간", data.workHours);
  add(
    "급여",
    `${data.salaryType} ${data.salary}만원 (퇴직금 ${
      data.retirement === "Y" ? "별도/포함" : "미포함"
    })`
  );

  y += 10;
  pdf.text("업무내용:", x, y);
  y += 15;
  (data.jobDesc || "").split("\n").forEach((line) => {
    pdf.text(line, x, y);
    y += 15;
  });
  y += 5;
  pdf.text("지원자격:", x, y);
  y += 15;
  (data.qualification || "").split("\n").forEach((line) => {
    pdf.text(line, x, y);
    y += 15;
  });
  y += 5;
  pdf.text("우대사항:", x, y);
  y += 15;
  (data.preference || "").split("\n").forEach((line) => {
    pdf.text(line, x, y);
    y += 15;
  });
  y += 5;
  pdf.text("기타사항:", x, y);
  y += 15;
  (data.etc || "").split("\n").forEach((line) => {
    pdf.text(line, x, y);
    y += 15;
  });

  // 서명
  y += 5;
  pdf.text("전자 서명:", x, y);
  y += 12;
  let sigDataUrl = "";
  if (!sigPad.isEmpty()) {
    sigDataUrl = sigPad.toDataURL("image/png");
    try {
      pdf.addImage(sigDataUrl, "PNG", x, y, 200, 70, undefined, "FAST");
      y += 80;
    } catch (e) {}
  }
  y += 20;
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  pdf.text(`신청일: 2025년  ${month} 월  ${date} 일`, x, y);
  y += 15;
  pdf.text("담당자: (서명/인)", x, y);

  const pdfDTO = await uploadPdf(pdf, data?.company || "no_업체명" + new Date().getTime());
  EMAIL_PARAM.pdfPath = `${STATIC_ORIGIN}/uploads/${pdfDTO.fileName}`;
  console.log("pdfDTO ", pdfDTO.fileName);

  const fileDTO = await sendSignature(sigPad, data?.company || "no_업체명" + new Date().getTime());
  EMAIL_PARAM.signaturePath = `${STATIC_ORIGIN}/uploads/${fileDTO.fileName}`;
  EMAIL_PARAM.companyName = data?.company || "NO_업체명";
  await sendEmail();
});
