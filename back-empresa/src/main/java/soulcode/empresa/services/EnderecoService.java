package soulcode.empresa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soulcode.empresa.models.Endereco;
import soulcode.empresa.models.Funcionario;
import soulcode.empresa.respositories.EnderecoRepository;
import soulcode.empresa.respositories.FuncionarioRepository;
import soulcode.empresa.services.exceptions.ObjectNotFoundException;

@Service
public class EnderecoService {

	@Autowired
	private EnderecoRepository enderecoRepository;

	@Autowired
	private FuncionarioService funcionarioService;

	@Autowired
	private FuncionarioRepository funcionarioRepository;

	public List<Endereco> listarTodosEndereco() {
		List<Endereco> endereco = enderecoRepository.findAll();
		return endereco;
	}

	public Endereco listarUmEndereco(Integer id_endereco) {
		Optional<Endereco> endereco = enderecoRepository.findById(id_endereco);
		return endereco.orElseThrow(()-> new ObjectNotFoundException("endereço não encontrado!"));
	}

	public Endereco listarEnderecoFunc(Integer id_funcionario) {
		Endereco endereco = enderecoRepository.buscarFuncEndereco(id_funcionario);
		return endereco;
	}

	public Endereco cadastrarEndereco(Integer id_funcionario, Endereco endereco) {
		endereco.setId_endereco(id_funcionario);
		if (id_funcionario != null) {
			Funcionario funcionario = funcionarioService.buscarUmFunc(id_funcionario);
			endereco.setFuncionario(funcionario);
			funcionario.setEndereco(endereco);
		}
		return enderecoRepository.save(endereco);
	}

	public Endereco editarEndereco(Integer id_funcionario, Endereco endereco) {
		if (id_funcionario != null) {
			Endereco obj = listarUmEndereco(endereco.getId_endereco());
			Funcionario funcAnterior = obj.getFuncionario();
			if (funcAnterior != null) {
				funcAnterior.setEndereco(null);
				funcionarioRepository.save(funcAnterior);
			}
			Funcionario funcionario = funcionarioService.buscarUmFunc(id_funcionario);
			endereco.setFuncionario(funcionario);
			funcionario.setEndereco(endereco);
		}
		return enderecoRepository.save(endereco);
	}

//	public Servico editarServico(Integer id_funcionario, Servico servico) {
//	if (id_funcionario != null) {
//		Servico obj = ListarUmServico(servico.getId_servico());
//
//		Funcionario funcAnterior = obj.getFuncionario();
//		if (funcAnterior != null) {
//			funcAnterior.setServico(null);
//			funcionarioRepository.save(funcAnterior);
//		}
//		Funcionario funcionario = funcionarioService.buscarUmFunc(id_funcionario);
//		servico.setFuncionario(funcionario);
//		funcionario.setServico(servico);
//	}
//	return servicoRepository.save(servico);
//}

}
