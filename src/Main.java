import freemarker.template.*;
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Configuration cfg = new Configuration(Configuration.VERSION_2_3_34);
        cfg.setDirectoryForTemplateLoading(new File("templates"));
        cfg.setDefaultEncoding("UTF-8");

        List<Map<String, String>> employees = new ArrayList<>();

        Map<String, String> emp1 = new HashMap<>();
        emp1.put("firstName", "Ashish");
        emp1.put("lastName", "Raj");
        emp1.put("email", "ashish@example.com");
        emp1.put("department", "Engineering");
        emp1.put("role", "Developer");

        employees.add(emp1);

        Map<String, Object> dataModel = new HashMap<>();
        dataModel.put("employees", employees);

        Template template = cfg.getTemplate("index.ftlh");

        File outFile = new File("output/index.html");
        outFile.getParentFile().mkdirs();
        try (Writer out = new FileWriter(outFile)) {
            template.process(dataModel, out);
        }

        System.out.println("HTML generated successfully.");
    }
}
