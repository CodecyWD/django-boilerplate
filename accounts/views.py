from django.contrib.auth import logout
from django.core.urlresolvers import reverse
from django.views.generic import TemplateView, RedirectView


class LoginView(TemplateView):
    template_name = 'accounts/login.html'


class LogoutView(RedirectView):
    permanent = False
    query_string = True

    def get_redirect_url(self, *args, **kwargs):
        logout(self.request)
        return reverse('index')
