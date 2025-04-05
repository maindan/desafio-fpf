import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProcessing, IProcessingPost } from '../shared/interface/IProcessing';

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public connect(processId: number): Observable<any> {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      console.warn("WebSocket já está aberto ou conectando...");
      return this.messageSubject.asObservable();
    }

    this.socket = new WebSocket(`ws://localhost:8000/ws/status/${processId}/`);

    this.socket.onopen = () => console.log("WebSocket conectado!");

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensagem recebida:", data);
      this.messageSubject.next(data);
    };

    this.socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    this.socket.onclose = (event) => {
      console.log("WebSocket fechado:", event.reason);
    };

    return this.messageSubject.asObservable();
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  public create_processing(processing: IProcessingPost): Observable<IProcessing> {
    console.log(processing);
    return this.http.post<IProcessing>("http://localhost:8000/processar", processing, { observe: 'body' });
  }
}
