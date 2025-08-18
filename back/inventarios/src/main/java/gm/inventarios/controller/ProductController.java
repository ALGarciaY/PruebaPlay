package gm.inventarios.controller;

import gm.inventarios.entity.Product;
import gm.inventarios.services.ProductService;
import gm.inventarios.services.ProductServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/inventory")
@CrossOrigin(value = "http://localhost:4200")
@Log4j2
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/allProducts")
    public ResponseEntity<List<Product>> listAllProducts() {
        List<Product> productsList = productService.listAllProducts();
        log.info("Productos obtenidos: ");
        productsList.forEach(product -> log.info(product.toString()));
        return ResponseEntity.ok().body(productsList);
    }

    @GetMapping("/selectOneById/{idProduct}")
    public ResponseEntity<Product> selectOneById(@PathVariable Integer idProduct) {
        Product product = productService.selectOneById(idProduct);
        log.info("Producto obtenido: " + product.toString());
        return ResponseEntity.ok().body(product);
    }

    @PostMapping("/saveProduct")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        Product productSaved = productService.saveProduct(product);
        log.info("Producto guardado: " + productSaved.toString());
        return ResponseEntity.ok().body(productSaved);
    }

    @PostMapping("/saveBuy")
    public ResponseEntity<Map<String, Object>> saveBuy(@RequestParam Integer idProduct, @RequestParam Integer quantity) {
        log.info("Producto comprado con id: " + idProduct + " y cantidad: " + quantity);
        String response = productService.saveBuy(idProduct, quantity);
        return ResponseEntity.ok(Map.of("message", response, "ok", true));
    }

    @PutMapping("/updateProduct/{idProduct}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer idProduct, @RequestBody Product product) {
        Product productUpdated = productService.updateProduct(idProduct, product);
        log.info("Producto actualizado: " + productUpdated.toString());
        return ResponseEntity.ok().body(productUpdated);
    }

    @DeleteMapping("/deleteProduct/{idProduct}")
    public ResponseEntity<Map<String,Boolean>> deleteProduct(@PathVariable Integer idProduct) {
        productService.deleteProduct(idProduct);
        log.info("Producto eliminado con id: " + idProduct);
        Map<String,Boolean> response = new HashMap<>();
        response.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok().body(response);
    }
}
