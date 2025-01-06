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
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-edit-modal',
  templateUrl: './news-edit-modal.component.html',
  styleUrls: ['./news-edit-modal.component.scss'],
  standalone: true,
  imports: [
    NgxEditorModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NewsEditModalComponent {
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
    protected dialogRef: MatDialogRef<NewsEditModalComponent>,
    protected sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editor = new Editor();
    this.newsForm = this.fb.group({
      id: [data.id, Validators.required],
      title: [data.title, Validators.required],
      category: [data.category, Validators.required],
      subcategories: [JSON.parse(data.sub_categories).join(', ')],
      short_description: [data.short_description, Validators.required],
      description: [data.description, Validators.required],
      keywords: [JSON.parse(data.keywords).join(', ')],
      author: [data.author, Validators.required],
      thumbnail: [''],
    });

    if (data.thumbnail) {
      this.previewUrl = data.thumbnail;
    }
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

      this.newsService.updateNews(formData).subscribe(
        (response) => {
          this.eventService.emitNewsAdded();
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error updating news:', error);
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
