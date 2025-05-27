import java.security.*;

public class Mensagem {
    
    private PublicKey chavePublicaDestinatario;
    private PublicKey chavePublicaRemetente;
    private PrivateKey chavePrivada;

    private String msgAssinada;
    private String msgCriptografada;

    public Mensagem() {
        this.chavePublicaDestinatario = null;
        this.chavePrivada = null;
        this.msgAssinada = "";
        this.msgCriptografada = "";
    }

    public Mensagem(String msgAssinada, String msgCriptografada, PublicKey chavePublicaDestinatario) {
        this.chavePublicaDestinatario = chavePublicaDestinatario;
        this.msgAssinada = msgAssinada;
        this.msgCriptografada = msgCriptografada;
    }

    public Mensagem(String msgAssinada, String msgCriptografada, PublicKey chavePublicaDestinatario, PublicKey chavePublicaRemetente) {
        this.chavePublicaDestinatario = chavePublicaDestinatario;
        this.chavePublicaRemetente = chavePublicaRemetente;
        this.msgAssinada = msgAssinada;
        this.msgCriptografada = msgCriptografada;
    }

    public void enviar() throws Exception{
        //CODIGO PARA ENVIAR CHAVE
    }

    public PublicKey getChavePublicaDestinatario() {
        return chavePublicaDestinatario;
    }

    public void setChavePublicaDestinatario(PublicKey chavePublica) {
        this.chavePublicaDestinatario = chavePublica;
    }

    public PublicKey getChavePublicaRemetente() {
        return chavePublicaRemetente;
    }

    public void setChavePublicaRemetente(PublicKey chavePublicaRemetente) {
        this.chavePublicaRemetente = chavePublicaRemetente;
    }

    public PrivateKey getChavePrivada() {
        return chavePrivada;
    }

    public void setChavePrivada(PrivateKey chavePrivada) {
        this.chavePrivada = chavePrivada;
    }

    public String getMsgAssinada() {
        return msgAssinada;
    }

    public void setMsgAssinada(String msgAssinada) {
        this.msgAssinada = msgAssinada;
    }

    public String getMsgCriptografada() {
        return msgCriptografada;
    }

    public void setMsgCriptografada(String msgCriptografada) {
        this.msgCriptografada = msgCriptografada;
    }

    

}
