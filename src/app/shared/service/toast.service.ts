import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetService } from '../../shared/service/action-sheet.service';
import { filter, from } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import für FormGroup hinzufügen

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
})
export class CategoryModalComponent {
  // Fügen Sie das categoryForm und submitting hinzu
  readonly categoryForm: FormGroup;
  submitting = false;

  constructor(
    private readonly actionSheetService: ActionSheetService,
    private readonly modalCtrl: ModalController,
    private fb: FormBuilder // Fügen Sie FormBuilder für die Verwendung von FormGroup hinzu
  ) {
    // Initialisieren Sie das categoryForm im Konstruktor
    this.categoryForm = this.fb.group({
      // Hier können Sie die Formularfelder und Validierungen hinzufügen
      // Beispiel:
      // categoryName: ['', Validators.required],
      // ...
    });
  }

  cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  save(): void {
    this.modalCtrl.dismiss(null, 'save');
  }

  delete(): void {
    from(this.actionSheetService.showDeletionConfirmation('Are you sure you want to delete this category?'))
      .pipe(filter((action) => action === 'delete'))
      .subscribe({
        next: () => {
          this.modalCtrl.dismiss(null, 'delete');
        },
      });
  }
}
