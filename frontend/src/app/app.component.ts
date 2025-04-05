import { Component, HostListener, inject, ChangeDetectorRef  } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IsMobileServiceService } from './services/is-mobile-service.service';
import { CommonModule } from '@angular/common';
import { ProcessingService } from './services/processing.service';
import { IProcessingPost } from './shared/interface/IProcessing';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isMobileView: boolean = false;
  private isMobileService: IsMobileServiceService = inject(IsMobileServiceService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup;
  public loading: boolean = false;
  public status = "off";
  public result: any = null;
  private websocketService: ProcessingService = inject(ProcessingService);
  private processId: number | null = null;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.isMobileService.isMobileView.subscribe({
      next: (value: boolean) => {
        this.isMobileView = value;
      }
    });

    this.form = this.formBuilder.group({
      num1: ['', Validators.required],
      num2: ['', Validators.required],
      num3: ['', Validators.required]
    });

    this.onResize();
  }

  public submit(event: SubmitEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if(this.status == 'Concluído') {
      this.restart()
    } else if (this.form.valid) {
      this.loading = true;
      this.status = "Em andamento";
      this.form.disable();

      const processingData: IProcessingPost = {
        num1: this.form.value.num1,
        num2: this.form.value.num2,
        num3: this.form.value.num3,
      };

      this.websocketService.create_processing(processingData).subscribe({
        next: (response) => {
          this.processId = response.id;
          this.connectWebSocket(response.id);
        },
        error: () => {
          this.loading = false;
          this.status = "erro";
          this.form.enable();
          this.processId = null;
        }
      });
    }
  }

  private connectWebSocket(processId: number): void {
    this.websocketService.connect(processId).subscribe({
      next: (update) => {
        this.status = update.status;
        if (update.status !== undefined && update.media !== undefined && update.mediana !== undefined) {
          this.result = update;
        }

        if (update.status === "Concluído") {
          this.loading = false;
          this.form.enable();
          this.websocketService.disconnect();
        }
      },
      error: () => {
        this.status = "erro";
        this.loading = false;
        this.form.enable();
        this.processId = null;
        this.websocketService.disconnect();
      }
    });
  }

  public restart(): void {
    this.form.reset();
    this.status = "off";
    this.result = null;
    this.loading = false;
    this.form.enable();
    this.processId = null;
    this.websocketService.disconnect();
    this.cdr.detectChanges();
  }

  @HostListener("window:resize", ['$event'])
  private onResize(): void {
    const isMobile: boolean = this.isMobileService.verifyIsMobile();
    this.isMobileService.setIsMobileView(isMobile);
  }
}
