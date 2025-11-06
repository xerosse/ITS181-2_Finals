package group2.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.List;

public class AuthInterceptor implements HandlerInterceptor {

    // Paths that require any logged-in user
    private static final List<String> AUTH_REQUIRED = Arrays.asList(
            "/api/add-application",
            "/api/update-application",
            "/api/delete-application"
            // add other endpoints that require login to apply (e.g., application endpoints)
    );

    // Paths that require ADMIN role
    private static final List<String> ADMIN_REQUIRED = Arrays.asList(
            "/api/add-dog",
            "/api/update-dog",
            "/api/delete-dog",
            "/api/add-account",
            "/api/update-account",
            "/api/delete-account"
            // add more admin-only endpoints as needed
    );

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getRequestURI();

        // Allow login/logout/current-user endpoints
        if (path.startsWith("/api/login") || path.startsWith("/api/logout") || path.startsWith("/api/current-user") || path.startsWith("/api/dogs") || path.startsWith("/api/show-dog") || path.startsWith("/api/show-account") || path.startsWith("/api/show-application") || path.startsWith("/api/accounts") || path.startsWith("/api/applications")) {
            return true;
        }

        HttpSession session = request.getSession(false);

        // Check admin first
        for (String p : ADMIN_REQUIRED) {
            if (path.startsWith(p)) {
                if (session == null || session.getAttribute("role") == null) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Login required");
                    return false;
                }
                String role = (String) session.getAttribute("role");
                if (!"ADMIN".equals(role)) {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Admin role required");
                    return false;
                }
                return true;
            }
        }

        // Check general auth-required paths
        for (String p : AUTH_REQUIRED) {
            if (path.startsWith(p)) {
                if (session == null || session.getAttribute("userId") == null) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Login required");
                    return false;
                }
                return true;
            }
        }

        // Default allow
        return true;
    }
}