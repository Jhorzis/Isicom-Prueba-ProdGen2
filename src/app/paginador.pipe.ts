import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL } from './services/global';

@Pipe({
  name: 'paginador'
})
export class PaginadorPipe implements PipeTransform {

  transform(lista: any[], pag: number): unknown {
    return lista.slice((pag * GLOBAL.page_count) - GLOBAL.page_count,(pag * GLOBAL.page_count));
  }

}
