import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetService } from '../../shared/service/action-sheet.service';
import { filter, from } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'Pfad/zur/CategoyService'; // Hier den tatsächlichen Pfad zu CategoryService einfügen
import { ToastService } from 'Pfad/zur/ToastService'; // Hier den tatsächlichen Pfad zu ToastService einfügen

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
})
export class CategoryModalComponent {
  readonly categoryForm: FormGroup;
  submitting = false;

  constructor(
    private readonly actionSheetService: ActionSheetService,
    private readonly categoryService: CategoryService, // CategoryService hinzufügen
    private readonly formBuilder: FormBuilder,
    private readonly modalCtrl: ModalController,
    private readonly toastService: ToastService // ToastService hinzufügen
  ) {
    this.categoryForm = this.formBuilder.group({
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
