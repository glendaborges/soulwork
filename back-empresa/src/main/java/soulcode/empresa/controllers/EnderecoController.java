package soulcode.empresa.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import soulcode.empresa.models.Endereco;
import soulcode.empresa.services.EnderecoService;

@CrossOrigin
@RestController
@RequestMapping("empresa")
public class EnderecoController {
	
	@Autowired
	private EnderecoService enderecoService;
	
	@GetMapping("/endereco")
	public List<Endereco> listarTodosSerico() {
		List<Endereco> endereco = enderecoService.listarTodosEndereco();
		return endereco;
	}
	
	@GetMapping("/endereco/{id_endereco}")
	public ResponseEntity<Endereco> listarUmEndereco(@PathVariable Integer id_endereco) {
		Endereco endereco = enderecoService.listarUmEndereco(id_endereco);
		return ResponseEntity.ok().body(endereco);
	} 
	
	@GetMapping("/endereco-func/{id_funcionario}")
	public ResponseEntity<Endereco> listarFuncEndereco(@PathVariable Integer id_funcionario){
		Endereco endereco = enderecoService.listarEnderecoFunc(id_funcionario);
		return ResponseEntity.ok().body(endereco);
	}
	
	@PostMapping("/endereco")
	public ResponseEntity<Endereco> cadastrarServico(
			@RequestParam(value = "funcionario", required = false) Integer id_funcionario,
			@RequestBody Endereco endereco) {
		endereco = enderecoService.cadastrarEndereco(id_funcionario, endereco);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(endereco.getId_endereco())
				.toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping("/endereco/{id_endereco}")
	public ResponseEntity<Endereco> editarEndereco(
			@RequestParam(value = "funcionario", required = false) Integer id_funcionario,
			@PathVariable Integer id_endereco, @RequestBody Endereco endereco) {
		endereco.setId_endereco(id_endereco);

		endereco = enderecoService.editarEndereco(id_funcionario, endereco);
		return ResponseEntity.noContent().build();
	}
	
}
