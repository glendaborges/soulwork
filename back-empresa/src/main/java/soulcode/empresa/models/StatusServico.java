package soulcode.empresa.models;

public enum StatusServico {
	
	PENDENTE("Pendente"),
	CONCLUIDO("Concuído"),
	CANCELADO("Cancelado");
	
	private String descricao;
	
	StatusServico(String descricao) {
		this.descricao = descricao;// TODO Auto-generated constructor stub
	}

	public String getDescricao() {
		return descricao;
	}
	
	
	
	

}
