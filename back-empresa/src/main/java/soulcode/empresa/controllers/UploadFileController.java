package soulcode.empresa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import soulcode.empresa.models.Funcionario;
import soulcode.empresa.services.FuncionarioService;
import soulcode.empresa.utils.UploadFileUtil;

@CrossOrigin
@RestController
@RequestMapping("empresa")
public class UploadFileController {

	@Autowired
	private FuncionarioService funcionarioService;

	@PostMapping("/envio/{id_funcionario}")
	ResponseEntity<String> enviarDados(@PathVariable Integer id_funcionario, MultipartFile foto,
			@RequestParam(value = "nome") String nome) {

		String fileName = nome;

		String uploadDir = "/Users/glend/OneDrive/Documentos/Programacao/SoulCode/Projeto Empresa/front-empresa/src/assets/img";
//		C:\Users\glend\OneDrive\Documentos/PROGRAMAÇÃO/SoulCode/front-empresa/src/assets/img

		String nomeMaisCaminho = uploadDir + "/" + nome;

		Funcionario funcionario = funcionarioService.salvarFoto(id_funcionario, nomeMaisCaminho);

		try {
			UploadFileUtil.salvarArquivo(uploadDir, fileName, foto);
		} catch (Exception e) {
			System.out.println("O arquivo não foi enviado" + e);
		}
		System.out.println("Deu certo: " + nomeMaisCaminho);
		return ResponseEntity.ok("Arquivo enviado");
	}

}
