import java.security.*;
import java.util.Base64;

public class Assinatura {

    public static void main(String[] args) {
        try {

            String mensagem = "Olá Mundo! Exemplo de assinatura digital!";

            KeyPair keyPair = gerarParDeChavesRSA();
            PublicKey chavePublica = keyPair.getPublic();
            PrivateKey chavePrivada = keyPair.getPrivate();

            String msgAssinada = assinar(mensagem, chavePrivada);

            boolean isVerificada = verificar(mensagem, msgAssinada, chavePublica);

            System.out.println("Assinatura Digital (Base64): " + msgAssinada);
            System.out.println("Assinatura Verificada: " + isVerificada);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    
    public static KeyPair gerarParDeChavesRSA() throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(4096); 
        return keyPairGenerator.generateKeyPair();
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
