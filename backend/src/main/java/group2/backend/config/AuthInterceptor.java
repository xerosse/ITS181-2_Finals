package group2.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // Allow OPTIONS requests (CORS preflight)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        HttpSession session = request.getSession(false);

        if (session == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"message\":\"Not authenticated\"}");
            return false;
        }

        Object userId = session.getAttribute("userId");
        Object role = session.getAttribute("role");

        if (userId == null || role == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"message\":\"Not authenticated\"}");
            return false;
        }

        // Check if the endpoint requires admin access
        String requestURI = request.getRequestURI();
        if (isAdminEndpoint(requestURI)) {
            if (!"ADMIN".equals(role)) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("{\"message\":\"Admin access required\"}");
                return false;
            }
        }

        return true;
    }

    private boolean isAdminEndpoint(String uri) {
        // Dog management endpoints
        if (uri.matches(".*/api/add-dog.*") ||
                uri.matches(".*/api/update-dog/.*") ||
                uri.matches(".*/api/delete-dog/.*")) {
            return true;
        }

        // Account management endpoints
        // Allow users to view their own account, but only admin can view all accounts
        if (uri.matches(".*/api/accounts.*") ||
                uri.matches(".*/api/update-account/.*") ||
                uri.matches(".*/api/delete-account/.*")) {
            return true;
        }
        // Note: /api/show-account/{id} is NOT admin-only - users can view their own account

        // Application management endpoints - ONLY viewing, updating, and deleting require admin
        // Users can create applications (add-application is allowed)
        if (uri.matches(".*/api/applications.*") ||
                uri.matches(".*/api/show-application/.*") ||
                uri.matches(".*/api/update-application/.*") ||
                uri.matches(".*/api/delete-application/.*")) {
            return true;
        }

        return false;
    }
}