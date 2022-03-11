package soulcode.empresa.controllers.exceptions;

public class StandardError {
	
	private String data;
	private Integer status;
	private String erro;
	
	public StandardError(String data, Integer status, String erro) {
		this.data = data;
		this.status = status;
		this.erro = erro;
	}

	
	public String getData() {
		return data;
	}


	public void setData(String data) {
		this.data = data;
	}


	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getErro() {
		return erro;
	}

	public void setErro(String erro) {
		this.erro = erro;
	}


}
