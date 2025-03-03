import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-message',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-message.component.html',
  styleUrls: ['./course-message.component.css']
})
export class CourseMessageComponent {
  selectedFiles: any[] = [];
  showPreview = false;
  uploadProgress: number | null = null;
  uploadSuccess = false;
  lastRemovedFile: any = null;
  originalFiles: any[] = [];

  // Handle file selection
  onDirectoryChange(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = [];

    // Process each file
    Array.from(files).forEach((file: File) => {
      const fileType = file.type;

      // For video files
      if (fileType.startsWith('video/')) {
        this.selectedFiles.push({
          file: file,
          name: file.name.replace(/\.[^/.]+$/, ""),
          type: fileType,
          preview: URL.createObjectURL(file),
          description: '',
          numbering: this.selectedFiles.length + 1, // Auto-number based on order
        });
      }
      // For image files (e.g., jpg, png, gif)
      else if (fileType.startsWith('image/')) {
        this.selectedFiles.push({
          file: file,
          name: file.name.replace(/\.[^/.]+$/, ""),
          type: fileType,
          preview: URL.createObjectURL(file),
          description: '',
          numbering: this.selectedFiles.length + 1,
        });
      }
      // For text files (e.g., txt, json)
      else if (fileType === 'text/plain' || fileType === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({
            file: file,
            name: file.name.replace(/\.[^/.]+$/, ""),
            type: fileType,
            preview: e.target.result,
            description: '',
            content: e.target.result,
            numbering: this.selectedFiles.length + 1, // Auto-number based on order
          });
        };
        reader.readAsText(file);
      }
    });
    this.originalFiles = [...this.selectedFiles];
  }

  // Toggle Preview
  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  saveFiles() {
    // Implement save functionality, e.g., send to backend or store locally
    alert('Files saved successfully!');
  }

  // Save file name
  saveFileName(index: number) {
    const file = this.selectedFiles[index];
    if (!file.name.trim()) {
      alert("File name cannot be empty!");
      file.name = file.file.name.replace(/\.[^/.]+$/, "");
    }
  }

  // Save manual numbering change
  saveManualNumbering(index: number) {
    const file = this.selectedFiles[index];
    if (file.numbering <= 0) {
      alert("Numbering must be a positive integer.");
      file.numbering = 1; // Reset to 1 if invalid
    }
  }

  // Undo last removed file action
  undoChanges(index: number) {
    const file = this.selectedFiles[index];
    const description = file.description.trim();

    // Split the description into words and remove the last word
    const words = description.split(' ');
    words.pop(); // Remove the last word

    // Join the remaining words back together
    file.description = words.join(' ');
  }

  // Save the text written in the description box for a specific file
  
  // Remove file
  removeFile(index: number) {
    this.lastRemovedFile = this.selectedFiles.splice(index, 1)[0];
  }

  // Upload files
  uploadFiles() {
    if (this.selectedFiles.length === 0) {
      alert('Please select files to upload!');
      return;
    }

    this.uploadProgress = 0;
    this.uploadSuccess = false;

    const formData = new FormData();
    this.selectedFiles.forEach((fileObj) => {
      formData.append('files', fileObj.file, `${fileObj.name}.${fileObj.file.name.split('.').pop()}`);
      formData.append('descriptions', fileObj.description);
      if (fileObj.content) {
        formData.append('content', fileObj.content);
      }
    });
    const uploadRequest = new XMLHttpRequest();
    uploadRequest.open('POST', 'YOUR_API_URL_HERE', true);

    uploadRequest.upload.onprogress = (event: ProgressEvent) => {
      if (event.lengthComputable) {
        this.uploadProgress = Math.round((100 * event.loaded) / event.total);
      }
    };

    uploadRequest.onload = () => {
      if (uploadRequest.status === 200) {
        this.uploadSuccess = true;
        this.uploadProgress = null;
      } else {
        alert('Upload failed');
      }
    };

    uploadRequest.send(formData);
  }

  // Handle content changes for text files
  updateTextContent(index: number, newContent: string) {
    this.selectedFiles[index].content = newContent;
  }
  undoRemoveFile() {
    if (this.lastRemovedFile) {
      this.selectedFiles.push(this.lastRemovedFile);
      this.lastRemovedFile = null; // Reset lastRemovedFile after undo
    }
  }
  
  // Your selected files array

  // Undo the changes made in the description box for a specific file
 

  // Save the text written in the description box for a specific file
  saveDescription(index: number) {
    const file = this.selectedFiles[index];
    // Here you can implement saving the description, 
    // for example, sending it to a server or storing it locally.
    console.log(`Description saved for file ${file.name}: ${file.description}`);
  }

  // Remove the file from the listn
}