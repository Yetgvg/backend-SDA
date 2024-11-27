export function validateCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false; // CPF não pode ser composto por números repetidos
    }
  
    // Valida o primeiro dígito verificador
    let soma = 0;
    let peso = 10;
  
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * peso--;
    }
  
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
  
    if (parseInt(cpf.charAt(9)) !== digito1) {
      return false; // Primeiro dígito verificador inválido
    }
  
    // Valida o segundo dígito verificador
    soma = 0;
    peso = 11;
  
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * peso--;
    }
  
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
  
    if (parseInt(cpf.charAt(10)) !== digito2) {
      return false; // Segundo dígito verificador inválido
    }
  
    return true; // CPF válido
  }  