# 🎓 Certificate Approval System (Form-Based Automation)

## 📘 Overview
This project automates the certificate generation and approval workflow using *Google Apps Script* and *Google Workspace tools*.  
When a student submits details through a *Google Form*, the system:
1. Stores responses in Google Sheets.
2. Sends an approval request email to the *CEO/HR*.
3. On approval, generates a *personalized certificate* from a Google Docs template.
4. Converts it into a *PDF*.
5. Emails the approved certificate to the student automatically.

---

## ⚙ Workflow

1. *Google Form Submission* – Students enter name, email, internship dates, etc.  
2. *Data Storage in Google Sheets* – All responses are automatically saved.  
3. *Apps Script Trigger* – Runs onFormSubmit() on new responses.  
4. *Approval Process* – Sends email to CEO/HR with “Approve” and “Reject” links.  
5. *Certificate Generation* – Generates a PDF certificate using Google Docs template.  
6. *Email Dispatch* – Sends the approved certificate to the student.

---

## 🧩 Tools Used

- *Google Forms* → Collect student data  
- *Google Sheets* → Store responses  
- *Google Docs* → Certificate template  
- *Google Drive* → Store generated PDFs  
- *Google Apps Script* → Automate approvals & emails  
- *Gmail API (Apps Script)* → Send emails  

---

## ⚙ Configuration

1. Copy config/config.example.json to config/config.json  
2. Fill it with your actual IDs:
   ```json
   {
     "FORM_ID": "YOUR_FORM_ID",
     "RESPONSE_SHEET_ID": "YOUR_SHEET_ID",
     "TEMPLATE_DOC_ID": "YOUR_DOC_TEMPLATE_ID",
     "FOLDER_ID": "YOUR_DRIVE_FOLDER_ID",
     "CEO_EMAIL": "ceo@example.com",
     "DEPLOYMENT_URL": "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
   }
