import java.security.*;
import java.util.Base64;
import javax.crypto.Cipher;

public class RSA {

    public static void main(String[] args) {
        try {
            
            String mensagem = "Olá Mundo! Exemplo de criptografia assimétrica (RSA)!";

            KeyPair keyPair = gerarParDeChavesRSA();
            PublicKey chavePublica = keyPair.getPublic();
            PrivateKey chavePrivada = keyPair.getPrivate();


            String msgCriptografada = criptografar(mensagem, chavePublica);
            String msgDescriptografada = descriptografar(msgCriptografada, chavePrivada);

            System.out.println("Texto criptografado: " + msgCriptografada);
            System.out.println("");
            System.out.println("Texto descriptografado: " + msgDescriptografada);


        } catch (Exception e) {
            System.out.println(e.getMessage());
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

    
}
