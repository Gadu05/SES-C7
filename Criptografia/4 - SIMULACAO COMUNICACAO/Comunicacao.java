import java.security.*;
import java.util.Base64;
import javax.crypto.*;

public class Comunicacao {

    public static void main(String[] args) {
        try {

            Mensagem mensagem;

            String msg01 = "Olá Bob, aqui é a Alice, como você está?";
            String msg02 = "Olá Alice, eu estou bem! E você?";
            String msg03 = "Eu estou bem! Qual é a sua data de aniversário?";

            ///// PAR DE CHAVES
            KeyPair aliceParChaves = gerarParDeChavesRSA();
            PublicKey aliceChavePublica = aliceParChaves.getPublic();
            PrivateKey aliceChavePrivada = aliceParChaves.getPrivate();

            KeyPair bobParChaves = gerarParDeChavesRSA();
            PublicKey bobChavePublica = bobParChaves.getPublic();
            PrivateKey bobChavePrivada = bobParChaves.getPrivate();


            mensagem = new Mensagem(assinar(msg01, aliceChavePrivada), criptografar(msg01, bobChavePublica), bobChavePublica, aliceChavePublica);
            System.out.println("Alice: " + receberMensagem(mensagem, bobChavePrivada) + "\n");
            

            enviarMensagem(msg02, aliceChavePublica, bobChavePrivada);


            mensagem = new Mensagem(assinar("NAO ASSINADO", aliceChavePrivada), criptografar(msg03, bobChavePublica), bobChavePublica, aliceChavePublica);
            System.out.println("Alice: " + receberMensagem(mensagem, bobChavePrivada) + "\n");


        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void enviarMensagem(String msg, PublicKey chaveDestinatario, PrivateKey chaveRemetente) {
        try {

            String msgAssinada = assinar(msg, chaveRemetente);
            String msgCriptografada = criptografar(msg, chaveDestinatario);

            Mensagem mensagem = new Mensagem(msgAssinada, msgCriptografada, chaveDestinatario);
            mensagem.enviar();

            System.out.println("Bob: " + msg + "\n");

        } catch (Exception e) {
            System.out.println("ERRO: " + e.getMessage());
        }
    }

    public static String receberMensagem(Mensagem mensagem, PrivateKey chaveDestinatario) {

        try {
            
            String msgDescriptografada = descriptografar(mensagem.getMsgCriptografada(), chaveDestinatario);

            if (verificar(msgDescriptografada, mensagem.getMsgAssinada(), mensagem.getChavePublicaRemetente())) {
                //System.out.println("Alice: " + msgDescriptografada);
            } else {
                System.out.println("Falha na verificação da assinatura. A mensagem a seguir pode não ser confiável.");
            }
            
            return msgDescriptografada;

        } catch (Exception e) {
            return "ERRO: " + e.getMessage();
        }

    }

    public static KeyPair gerarParDeChavesRSA() throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(4096);
        return keyPairGenerator.generateKeyPair();
    }

    public static String criptografar(String msg, PublicKey chavePublica) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, chavePublica);
        byte[] encryptedData = cipher.doFinal(msg.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    
    public static String descriptografar(String msgCriptografada, PrivateKey chavePrivada) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, chavePrivada);
        byte[] decodedData = Base64.getDecoder().decode(msgCriptografada);
        byte[] decryptedData = cipher.doFinal(decodedData);
        return new String(decryptedData);
    }


    public static String assinar(String msg, PrivateKey chavePrivada) throws Exception {
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(chavePrivada);
        signature.update(msg.getBytes());
        byte[] signedData = signature.sign();
        return Base64.getEncoder().encodeToString(signedData); 
    }

    public static boolean verificar(String msg, String assinatura, PublicKey chavePublica) throws Exception {
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initVerify(chavePublica);
        signature.update(msg.getBytes());
        byte[] signatureBytes = Base64.getDecoder().decode(assinatura);
        return signature.verify(signatureBytes);
    }

    
    

}
