package soulcode.empresa.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import soulcode.empresa.models.Cargo;
import soulcode.empresa.models.Funcionario;
//import soulcode.empresa.respositories.FuncionarioRepository;
import soulcode.empresa.services.FuncionarioService;






@CrossOrigin // resolve os problemas de cors
@RestController // informa que é um controller = define as rotas (endpoints)
@RequestMapping("empresa") // define a rota principal
public class FuncionarioController {
	
//	@Autowired
//	private FuncionarioRepository funcionarioRepository;

	@Autowired
	private FuncionarioService funcionarioService;
	
//	buscar todos
	@GetMapping("/funcionario") // endpoint para acessar esse método
	public List<Funcionario> mostrarTodosAlunos() {
		List<Funcionario> funcionario = funcionarioService.buscarTodos();
		return funcionario;
	}
	
//  buscar um
	@GetMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<?> buscarUmFunc(@PathVariable Integer id_funcionario) {
		Funcionario funcionario = funcionarioService.buscarUmFunc(id_funcionario);
		return ResponseEntity.ok().body(funcionario);
	}
	
	@GetMapping("/funcionario/buscar-cargo/{id_cargo}")
	public List<Funcionario> buscarFunCargo(@PathVariable Integer id_cargo){
		List<Funcionario> funcionario = funcionarioService.buscarFunCargo(id_cargo);
		return funcionario;
	}
	
	@GetMapping("/funcionario-cpf/{func_cpf}")
	public ResponseEntity<?> buscarCpf(@PathVariable String func_cpf) {
		Funcionario funcionario = funcionarioService.buscarCpf(func_cpf);
		return ResponseEntity.ok().body(funcionario);
	}
	
//	inserir
	@PostMapping("/funcionario")
	public ResponseEntity<Void> inserirAluno(@RequestParam(value= "cargo") Integer id_cargo, @RequestBody Funcionario funcionario) {
		funcionario = funcionarioService.inserirFuncionario(id_cargo,funcionario);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/funcionario/{id}").buildAndExpand(funcionario.getId_funcionario())
				.toUri();
		return ResponseEntity.created(uri).build();
	}
	
// salvar foto 
	@PostMapping("/funcionario-img/{id_funcionario}")
	public ResponseEntity<String> salvarImgFunc(@PathVariable Integer id_funcionario,
			@RequestParam(value = "nome") String nome){
		Funcionario funcionario = funcionarioService.salvarFoto(id_funcionario, nome);
		return ResponseEntity.ok("Arquivo enviado");
	}
		
	
	
//	deletar
	@DeleteMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<Void> deletarfunc(@PathVariable Integer id_funcionario) {
		funcionarioService.deletarFuncionario(id_funcionario);
//		noContent = o retorno vai ser vazio
		return ResponseEntity.noContent().build();
	}
	
//	update
	@PutMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<Void> editarFuncionario(@RequestParam(value="cargo") Cargo cargo ,@PathVariable Integer id_funcionario, @RequestBody Funcionario funcionario) {
		funcionario.setId_funcionario(id_funcionario);
		funcionario.setCargo(cargo);
		funcionario = funcionarioService.editarFuncionario(funcionario);
		return ResponseEntity.noContent().build();
	}
	

	

}
