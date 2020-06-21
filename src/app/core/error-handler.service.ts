import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toasty: ToastrService) {}

  handle(errorResponse: any) {
    let msg: string;
    let errorJson = JSON.parse(JSON.stringify(errorResponse));

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorJson.status >= 400 && errorJson.status < 500) {
      msg = 'Ocorreu um erro ao processar sua solicitação';

      try {
        msg = errorJson.error[0].mensagemUsuario;
      } catch (e) {}
      console.error('Ocorreu um erro ', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro ', errorResponse);
    }

    this.toasty.error(msg);
  }
}
