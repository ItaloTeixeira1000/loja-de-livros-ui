export class Fornecedor {
  codigo: number;
  razaoSocial: string;
  nomeFantasma: string;
  ativo: boolean;
  cnpj: string;
  inscricaoEstadual: number;
  telefone: string;
  enderecoFornecedor = new Endereco();
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Livro {
  codigo: number;
  titulo: string;
  autor: string;
  descricao: string;
  isbn: number;
  dataPublicacao: Date;
  paginas: number;
  fornecedor = new Fornecedor();
  preco: number;
}
