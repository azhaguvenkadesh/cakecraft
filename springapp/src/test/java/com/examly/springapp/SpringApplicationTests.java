package com.examly.springapp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Order(1)
    void backend_test_Add_Cake() throws Exception {
        String requestBody = "{\"name\": \"Chocolate Fudge Cake\", \"category\": \"Birthday Cake\", \"price\": 25.99, \"quantity\": 10, \"cakeImage\": \"https://example.com/images/chocolate-fudge-cake.jpg\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/cakes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Chocolate Fudge Cake"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.category").value("Birthday Cake"));
    }

    @Test
    @Order(2)
    void backend_test_Add_Cake_With_Duplicate_Name() throws Exception {
        String cakeJson = "{\"name\":\"Duplicate Cake\",\"category\":\"Birthday Cake\",\"price\":29.99,\"quantity\":5,\"cakeImage\":\"base64EncodedImage\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/cakes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(cakeJson)
                .accept(MediaType.APPLICATION_JSON));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/cakes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(cakeJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Failed to add cake"));
    }

    @Test
    @Order(3)
    void backend_test_Get_AllCakes() throws Exception {
        mockMvc.perform(get("/api/cakes")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @Order(4)
    void backend_test_Get_Cake_ById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/cakes/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Chocolate Fudge Cake"));
    }

    @Test
    @Order(5)
    void backend_test_Get_NonExistent_Cake() throws Exception {
        mockMvc.perform(get("/api/cakes/999")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$").value("Cake not found"));
    }

    @Test
    @Order(6)
    void backend_test_Update_Cake() throws Exception {
        String updatedCakeJson = "{\"name\":\"Updated Cake\",\"category\":\"Updated Category\",\"price\":39.99,\"quantity\":15,\"cakeImage\":\"updatedImage\"}";

        mockMvc.perform(MockMvcRequestBuilders.put("/api/cakes/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedCakeJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Updated Cake"));
    }

    @Test
    @Order(7)
    void backend_test_Delete_Cake() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/cakes/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Cake deleted successfully"));
    }

    @Test
    @Order(8)
    public void backend_test_Controller_Directory_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/controller";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    @Order(9)
    public void backend_test_Model_Directory_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/model";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    @Order(10)
    public void backend_test_Service_Directory_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    @Order(11)
    public void backend_test_Repository_Directory_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/repository";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    @Order(12)
    public void backend_test_CakeController_Class_Exists() {
        checkClassExists("com.examly.springapp.controller.CakeController");
    }

    @Test
    @Order(13)
    public void backend_test_Cake_Model_Class_Exists() {
        checkClassExists("com.examly.springapp.model.Cake");
    }

    @Test
    @Order(14)
    public void backend_test_CakeService_Class_Exists() {
        checkClassExists("com.examly.springapp.service.CakeService");
    }

    @Test
    @Order(15)
    public void backend_test_CakeRepository_Class_Exists() {
        checkClassExists("com.examly.springapp.repository.CakeRepository");
    }

    @Test
    @Order(16)
    public void backend_test_Cake_Model_Has_Required_Fields() {
        checkFieldExists("com.examly.springapp.model.Cake", "cakeId");
        checkFieldExists("com.examly.springapp.model.Cake", "name");
        checkFieldExists("com.examly.springapp.model.Cake", "category");
        checkFieldExists("com.examly.springapp.model.Cake", "price");
        checkFieldExists("com.examly.springapp.model.Cake", "quantity");
        checkFieldExists("com.examly.springapp.model.Cake", "cakeImage");
    }

    @Test
    @Order(17)
    public void backend_test_CakeRepository_Extends_JpaRepository() {
        checkClassImplementsInterface("com.examly.springapp.repository.CakeRepository",
                "org.springframework.data.jpa.repository.JpaRepository");
    }

    @Test
    @Order(18)
    public void backend_test_CorsConfig_Class_Exists() {
        checkClassExists("com.examly.springapp.configuration.CorsConfig");
    }

    @Test
    @Order(19)
    public void backend_test_SwaggerConfig_Class_Exists() {
        checkClassExists("com.examly.springapp.configuration.SwaggerConfig");
    }

    @Test
    @Order(20)
    public void backend_test_CakeException_Class_Exists() {
        checkClassExists("com.examly.springapp.exception.CakeException");
    }

    @Test
    @Order(21)
    public void backend_test_CakeException_Extends_Exception() {
        try {
            Class<?> clazz = Class.forName("com.examly.springapp.exception.CakeException");
            assertTrue(Exception.class.isAssignableFrom(clazz),
                    "CakeException should extend Exception");
        } catch (ClassNotFoundException e) {
            fail("CakeException class does not exist.");
        }
    }

    private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    private void checkFieldExists(String className, String fieldName) {
        try {
            Class<?> clazz = Class.forName(className);
            clazz.getDeclaredField(fieldName);
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field " + fieldName + " in class " + className + " does not exist.");
        }
    }

    private void checkClassImplementsInterface(String className, String interfaceName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> interfaceClazz = Class.forName(interfaceName);
            assertTrue(interfaceClazz.isAssignableFrom(clazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or interface " + interfaceName + " does not exist.");
        }
    }
}