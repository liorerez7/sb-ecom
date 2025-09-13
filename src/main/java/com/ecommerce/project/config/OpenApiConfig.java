package com.ecommerce.project.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger / OpenAPI configuration (3 קבוצות בלבד):
 * - Public  : כל מה שלא Admin/Seller (כולל public וגם endpoints של לקוח מאומת)
 * - Seller  : /api/seller/**
 * - Admin   : /api/admin/**
 *
 * BABY STEPS לראות את זה:
 * 1) הפעל את השרת
 * 2) כנס ל: http://localhost:8080/swagger-ui/index.html
 * 3) למעלה בחר מה־Dropdown אחת הקבוצות: Public / Seller / Admin
 *
 * הערות למעבר לענן:
 * - אין כאן servers קשיחים → לא צריך לשנות כשעוברים לענן.
 * - אם תרצה לשנות כותרות/איש קשר: עדכן את Info/Contact למטה.
 *   // here you need to change according to your project branding
 */
@Configuration
public class OpenApiConfig {

    // שם הקוקי של ה-JWT (מוגדר ב-application.properties)
    @Value("${spring.app.jwtCookie:springBootEcom}")
    private String jwtCookieName;

    @Bean
    public OpenAPI baseOpenAPI() {
        Info info = new Info()
                .title("E-Commerce API") // here you need to change according to your project branding
                .version("v1")
                .description("""
                        API groups by role:
                        - Public: public endpoints + customer (authenticated user) endpoints
                        - Seller: seller endpoints
                        - Admin : admin endpoints
                        """)
                .contact(new Contact()
                        .name("E-Com Team")       // here you need to change according to your branding
                        .email("liorerez6@gmail.com")); // here you need to change according to your contact

        // סכימת אבטחה: JWT ב-HttpOnly Cookie (הדפדפן שולח אוטומטית ב-Try it out)
        SecurityScheme cookieAuth = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)
                .in(SecurityScheme.In.COOKIE)
                .name(jwtCookieName);

        return new OpenAPI()
                .info(info)
                .components(new Components().addSecuritySchemes("cookieAuth", cookieAuth))
                .addSecurityItem(new SecurityRequirement().addList("cookieAuth"));
    }

    /* =====================  GROUPS (3 בלבד)  ===================== */

    /**
     * Public = “לקוח/ציבור”: כל מה שאינו Admin/Seller.
     * שים לב: קבוצה זו כוללת גם endpoints ציבוריים (ללא התחברות),
     * וגם endpoints של “לקוח מאומת” (addresses/cart/order/auth).
     * זה מכוון כדי לא להוסיף קבוצה רביעית (User) כפי שביקשת.
     */
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("Public")
                .pathsToMatch(
                        // ציבורי אמיתי:
                        "/api/public/**",
                        "/api/images/**", "/images/**",
                        // לקוח מאומת (Customer/User):
                        "/api/addresses/**", "/api/users/addresses",
                        "/api/cart/**", "/api/carts/**",
                        "/api/order/**",
                        // אימות (כדאי שיופיע באותו טאב לצורך דמו):
                        "/api/auth/**"
                )
                .pathsToExclude(
                        "/api/admin/**",
                        "/api/seller/**"
                )
                .build();
    }

    /** Seller — כל נתיבי המוכר */
    @Bean
    public GroupedOpenApi sellerApi() {
        return GroupedOpenApi.builder()
                .group("Seller")
                .pathsToMatch("/api/seller/**")
                .build();
    }

    /** Admin — כל נתיבי הניהול (מוצרים/קטגוריות/הזמנות/אנליטיקות וכו’) */
    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
                .group("Admin")
                .pathsToMatch("/api/admin/**")
                .build();
    }
}
