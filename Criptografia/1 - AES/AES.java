

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

public class AES
{
	public static void main(String[] args) {
		try {
            
            String mensagem = "Olá Mundo! Exemplo de criptografia simétrica (AES)!";

            SecretKey secretKey = gerarChaveAES();

            String msgCriptografada = criptografar(mensagem, secretKey);
            String msgDescriptografada = descriptografar(msgCriptografada, secretKey);

            System.out.println("Texto criptografado: " + msgCriptografada);
            System.out.println("");
            System.out.println("Texto descriptografado: " + msgDescriptografada);


        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
	}
	
    public static SecretKey gerarChaveAES() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        keyGenerator.init(256);
        return keyGenerator.generateKey();
    }
    
    public static String criptografar(String msg, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedData = cipher.doFinal(msg.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    
    public static String descriptografar(String msgCriptografada, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decodedData = Base64.getDecoder().decode(msgCriptografada);
        byte[] decryptedData = cipher.doFinal(decodedData);
        return new String(decryptedData, StandardCharsets.UTF_8);
    }
	
	
}
