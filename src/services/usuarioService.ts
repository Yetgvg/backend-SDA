import { PrismaClient, Role, Usuario } from '@prisma/client';
import { encryptAES, decryptAES } from '../utils/crypto';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

class UsuarioService {
  async criar(nome: string, email: string, senha: string, telefone: string | null, role: Role) {
    const emailExistente = await prisma.usuario.findUnique({ where: { email } });

    if (emailExistente) {
      throw new Error('Essa conta de e-mail já foi cadastrada, por favor, digite outra.');
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~-]).{12,}$/;

    if (!regex.test(senha)) {
      throw new Error('A senha deve ter pelo menos 12 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
    }

    const senhaCriptografada = encryptAES(senha);
    const telefoneCriptografado = telefone ? encryptAES(telefone) : null;

    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada, telefone: telefoneCriptografado, role },
    });

    return usuario;
  }

  async listarTodos() {
    const usuarios = await prisma.usuario.findMany();
    return usuarios.map((usuario: Usuario) => ({
      ...usuario,
      telefone: usuario.telefone ? decryptAES(usuario.telefone) : null,
    }));
  }

  async listarTodosAtivos() {
    const usuarios = await prisma.usuario.findMany({ where: { esquecido: true } });
    return usuarios.map((usuario: Usuario) => ({
      ...usuario,
      telefone: usuario.telefone ? decryptAES(usuario.telefone) : null,
    }));
  }

  async listarUsuario(id: string) {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new Error('Usuário não encontrado');
    return {
      ...usuario,
      telefone: usuario.telefone ? decryptAES(usuario.telefone) : null,
    };
  }

  async atualizar(id: string, nome: string, telefone: string | null) {
    const usuario = await prisma.usuario.update({
      where: { id },
      data: { nome, telefone: telefone ? encryptAES(telefone) : undefined },
    });
    return usuario;
  }

  async excluir(id: string) {
    await prisma.usuario.delete({ where: { id } });
  }

  async inativar(id: string) {
    const usuarioEsquecido = await prisma.usuario.findUnique({ where: { id } });
    const esquecido = usuarioEsquecido?.esquecido;

    if (esquecido === true) {
      return await prisma.usuario.update({
        where: { id },
        data: { esquecido: false },
      });
    } else {
      return await prisma.usuario.update({
        where: { id },
        data: { esquecido: true },
      });
    }
  }
}

export default new UsuarioService();