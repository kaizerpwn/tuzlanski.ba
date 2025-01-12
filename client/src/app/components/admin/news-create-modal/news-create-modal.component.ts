import { Component, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { CATEGORIES } from '../../../utils/constants';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-create-modal.component.html',
  styleUrls: ['./news-create-modal.component.scss'],
  standalone: true,
  imports: [
    NgxEditorModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NewsModalComponent {
  newsForm: FormGroup;
  editor: Editor;
  categories = CATEGORIES;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline'],
    ['ordered_list', 'bullet_list'],
    ['link'],
    ['align_left', 'align_center', 'align_right'],
  ];

  constructor(
    private newsService: NewsService,
    private eventService: EventService,
    private fb: FormBuilder,
    protected dialogRef: MatDialogRef<NewsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editor = new Editor();
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      subcategories: [''],
      short_description: ['', Validators.required],
      description: ['', Validators.required],
      keywords: [''],
      author: ['', Validators.required],
      thumbnail: [''],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = e.target?.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.newsForm.valid) {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('thumbnail', this.selectedFile);
      }
      formData.append(
        'data',
        JSON.stringify({
          ...this.newsForm.value,
          subcategories: this.newsForm.value.subcategories
            .split(',')
            .map((s: string) => s.trim()),
          keywords: this.newsForm.value.keywords
            .split(',')
            .map((k: string) => k.trim()),
        })
      );

      this.newsService.createNews(formData).subscribe(
        (response) => {
          this.eventService.emitNewsAdded();
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating news:', error);
        }
      );
    }
  }

  changeImage(): void {
    this.previewUrl = null;
    const fileInput = document.getElementById('thumbnail') as HTMLInputElement;
    fileInput.value = '';
    fileInput.click();
  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}
