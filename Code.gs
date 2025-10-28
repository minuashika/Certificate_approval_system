```javascript
function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = sheet.getLastRow();

  // Read form response data (adjust column numbers as per your Sheet)
  const name = sheet.getRange(row, 2).getValue();        // Column B
  const startDate = formatDate(sheet.getRange(row, 3).getValue()); // Column C
  const endDate = formatDate(sheet.getRange(row, 4).getValue());   // Column D
  const email = sheet.getRange(row, 5).getValue();       // Column E

  const ceoEmail = "hr@example.com"; // Replace with actual CEO/HR email
  const approvalUrl = createApprovalLink(row, "approve");
  const rejectionUrl = createApprovalLink(row, "reject");

  // Send approval request email to HR/CEO
  MailApp.sendEmail({
    to: ceoEmail,
    subject: "Certificate Approval Request",
    body: Please review the certificate request for ${name}.\n\n +
          Approve: ${approvalUrl}\nReject: ${rejectionUrl}
  });

  // Add status column if not present
  if (sheet.getRange(1, 6).getValue() !== "Status") {
    sheet.getRange(1, 6).setValue("Status");
  }
  sheet.getRange(row, 6).setValue("Pending Approval");
}

/** Create web app approval/rejection link */
function createApprovalLink(row, action) {
  const deploymentUrl = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
  return ${deploymentUrl}?row=${row}&action=${action};
}

/** Handle Approve/Reject actions */
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = e.parameter.row;
  const action = e.parameter.action;

  const name = sheet.getRange(row, 2).getValue();
  const startDate = formatDate(sheet.getRange(row, 3).getValue());
  const endDate = formatDate(sheet.getRange(row, 4).getValue());
  const email = sheet.getRange(row, 5).getValue();

  if (action === "approve") {
    const pdfId = generateCertificate(name, startDate, endDate);
    const pdfUrl = https://drive.google.com/file/d/${pdfId}/view;

    MailApp.sendEmail({
      to: email,
      subject: "Your Internship Certificate",
      body: Dear ${name},\n\nCongratulations! Your certificate has been approved.\n\nYou can view or download it here:\n${pdfUrl}\n\nBest regards,\nHR Team,
      attachments: [DriveApp.getFileById(pdfId).getAs(MimeType.PDF)]
    });

    sheet.getRange(row, 6).setValue("Approved");
    return ContentService.createTextOutput("✅ Certificate Approved and Sent!");
  } else {
    MailApp.sendEmail({
      to: email,
      subject: "Certificate Request Rejected",
      body: Dear ${name},\n\nUnfortunately, your certificate request was rejected.\n\nBest regards,\nHR Team
    });

    sheet.getRange(row, 6).setValue("Rejected");
    return ContentService.createTextOutput("❌ Certificate Rejected!");
  }
}

/** Generate personalized certificate */
function generateCertificate(name, startDate, endDate) {
  const templateDocId = "YOUR_DOC_TEMPLATE_ID";
  const folderId = "YOUR_DRIVE_FOLDER_ID";

  const templateDoc = DriveApp.getFileById(templateDocId).makeCopy(${name}_Certificate);
  const doc = DocumentApp.openById(templateDoc.getId());
  const body = doc.getBody();

  body.replaceText("{{Name}}", name);
  body.replaceText("{{Start Date}}", startDate);
  body.replaceText("{{End Date}}", endDate);

  doc.saveAndClose();

  const pdf = DriveApp.getFileById(templateDoc.getId()).getAs(MimeType.PDF);
  const folder = DriveApp.getFolderById(folderId);
  const pdfFile = folder.createFile(pdf);

  return pdfFile.getId();
}

/** Format date to human-readable */
function formatDate(date) {
  if (date instanceof Date) {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), "dd MMM yyyy");
  }
  return date;
}
