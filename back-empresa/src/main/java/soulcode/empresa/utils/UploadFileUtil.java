package soulcode.empresa.utils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

public class UploadFileUtil {

//	dir onde está o arquivo, nome do arquivo, arquivo
	public static void salvarArquivo(String uploadDir, String fileName, MultipartFile file) throws IOException {
//		throws IOException = lança uma exception se não conseguir

//		caminho
		Path uploadPath = Paths.get(uploadDir);

//		verificação para saber se o caminho existe
		if (!Files.exists(uploadPath)) {
//			se não existir, cria o caminho
			Files.createDirectories(uploadPath);
		}

//		InputStream = responsavel por identificar o arquivo selecionado e traz ele forma de bites para armazenar. Classe que faz a leitura do arquivo
		try (InputStream inputStream = file.getInputStream()) {
			Path filePath = uploadPath.resolve(fileName);
//			faz uma cópia do arquivo que ta no computador para o servidor, porém se lá no servidor tiver o mesmo arquivo, ele vão ser substituido. Assim não terá arquivos duplicados. 
			Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);

		} catch (IOException e) {
			throw new IOException("Não foi possível enviar o seu arquivo" + fileName, e);
		}

	}

}
