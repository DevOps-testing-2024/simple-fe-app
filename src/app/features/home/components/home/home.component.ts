import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DescriptionServiceRepository } from '../../services/repository/description/description.service.repository';
import { DescriptionModel } from '../../../../shared/models/response/description.model';
import { DescriptionRequestModel } from '../../../../shared/models/request/description.request.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  @ViewChild('addDescriptionModal') addDescriptionModal!: TemplateRef<any>;
  @ViewChild('updateDescriptionModal') updateDescriptionModal!: TemplateRef<any>;

  descriptions: DescriptionModel[] = [];
  newDescription: FormControl = new FormControl('');
  existingDescription: FormGroup = new FormGroup({
    id: new FormControl(''),
    details: new FormControl('')
  });

  constructor(
    private modalService: NgbModal, 
    private descriptionServiceRepository: DescriptionServiceRepository) {}

  ngOnInit() {
    this.getDescriptions();
  }

  openAddModal() {
    this.newDescription.setValue('');
    this.modalService.open(this.addDescriptionModal, {centered: true});
  }

  openUpdateModal(description: DescriptionModel) {
    this.existingDescription.patchValue(description);
    this.modalService.open(this.updateDescriptionModal, {centered: true});
  }

  createDescription(): void {
    const descriptionRequest: DescriptionRequestModel = { details: this.newDescription.value };
    this.descriptionServiceRepository.createDescription(descriptionRequest).subscribe(() => {
      this.getDescriptions();
    });
  }

  updateDescription(): void {
    const descriptionRequest: DescriptionRequestModel = { details: this.existingDescription.value.details };
    this.descriptionServiceRepository.updateDescription(this.existingDescription.value.id , descriptionRequest).subscribe(() => {
      this.getDescriptions();
    });
  }

  deleteDescription(descriptionId: number): void {
    this.descriptionServiceRepository.deleteDescription(descriptionId).subscribe(() => {
      this.getDescriptions();
    });
  }

  private getDescriptions() {
    this.descriptionServiceRepository.getDescriptions()
    .subscribe(
      (data: DescriptionModel[]) => {
        this.descriptions = data;
      },
      (error: any) => {
        console.error('Error fetching descriptions', error);
      }
    );
  }
}
