$(document).ready(function(){function e(){$("#register-confirm-password").val().length&&$("#register-password").val()!=$("#register-confirm-password").val()?$("#register-confirm-password").get(0).setCustomValidity("confirm"):$("#register-confirm-password").get(0).setCustomValidity(""),$("#register-confirm-password").closest(".mdl-textfield").get(0).MaterialTextfield.checkValidity()}$("#register-password, #register-confirm-password").keyup(e).change(e),$("#go-register-button").click(function(){var e=$("#register-email").closest(".mdl-textfield").get(0).MaterialTextfield,t=$("#register-password").closest(".mdl-textfield").get(0).MaterialTextfield;$("#login-email").val().length&&($("#register-email").val($("#login-email").val()),e.boundUpdateClassesHandler(),e.checkValidity()),$("#login-password").val().length&&($("#register-password").val($("#login-password").val()),t.boundUpdateClassesHandler(),t.checkValidity()),$("#index-layout").addClass("login-out"),setTimeout(function(){$("#index-layout").addClass("register-shown"),setTimeout(function(){$("#index-layout").addClass("register-in")},100)},500)}),$("#login-card form input.mdl-textfield__input, #register-card form input.mdl-textfield__input").focus(function(){$(this).prop("required",!0)}).blur(function(e){if($(this).closest(".mdl-textfield").get(0).MaterialTextfield.checkValidity(),!this.validity.valid){e.preventDefault(),$(this).focus();var t=this;setTimeout(function(){$(t).closest(".mdl-textfield").addClass("is-focused")},0)}}).keypress(function(e){13==e.which&&(e.preventDefault(),$(this).closest("form").submit())}).keyup(function(e){$(this).hasClass("update")&&this.validity.customError&&(this.setCustomValidity(""),$(this).closest(".mdl-textfield").find(".mdl-textfield__error").text($(this).data("error")),$(this).closest(".mdl-textfield").get(0).MaterialTextfield.checkValidity())}),$("#login-fab-button, #login-button, #register-fab-button, #register-button").click(function(){$(this).closest(".mdl-card").find("form").submit()}),$("#login-card form").submit(function(e){if(e.preventDefault(),$(this).hasClass("busy"))return!1;if($("#login-card form input.mdl-textfield__input").focus().blur(),!this.checkValidity())return!1;var t=$(this).serializeArray();t.push({name:"save-session",value:$("#login-save-session").is(":checked")}),$(this).addClass("busy"),$.post(config.backend_base+"/login",t,function(e){switch(e.status){case 400:$("#"+e.object).closest(".mdl-textfield").get(0).MaterialTextfield.checkValidity();break;case 403:$("#"+e.object).addClass("update").get(0).setCustomValidity("update"),$("#"+e.object).closest(".mdl-textfield").get(0).MaterialTextfield.checkValidity(),e.error&&($("#"+e.object).data("error",$("#"+e.object).closest(".mdl-textfield").find(".mdl-textfield__error").text()),$("#"+e.object).closest(".mdl-textfield").find(".mdl-textfield__error").text(e.error),swal({title:"Oops...",text:e.error,type:"error",confirmButtonText:"OK"}));break;case 200:localStorage.setItem("user",JSON.stringify(e.user)),swal({title:"Login Success",text:"Login succeeded. Redirecting you to your dashboard...",timer:2e3,type:"success",showConfirmButton:!1},function(){location.href="/dashboard"});break;case 500:default:swal({title:"Login Failure",text:"Unexpected error happended! Please try again and contact us if problem persists.",type:"error",confirmButtonText:"OK"})}},"json").error(function(){swal({title:"Login Failure",text:"Failed to connect to backend server! Please try again later.",type:"error",confirmButtonText:"OK"})}).always(function(){$("#login-card form").removeClass("busy")})}),$("#register-card form").submit(function(e){if(e.preventDefault(),$(this).hasClass("busy"))return!1;if($("#register-card form input.mdl-textfield__input").focus().blur(),!this.checkValidity())return!1;$("#register-confirm-password").prop("disabled",!0);var t=$(this).serializeArray();$("#register-confirm-password").prop("disabled",!1),$(this).addClass("busy"),$.post(config.backend_base+"/register",t,function(e){switch(e.status){case 400:$("#"+e.object).closest(".mdl-textfield").get(0).MaterialTextfield.checkValidity();break;case 403:$("#"+e.object).addClass("update").get(0).setCustomValidity("update"),$("#"+e.object).closest(".mdl-textfield").get(0).MaterialTextfield.checkValidity(),e.error&&($("#"+e.object).data("error",$("#"+e.object).closest(".mdl-textfield").find(".mdl-textfield__error").text()),$("#"+e.object).closest(".mdl-textfield").find(".mdl-textfield__error").text(e.error),swal({title:"Oops...",text:e.error,type:"error",confirmButtonText:"OK"},function(){e.refresh&&location.reload()}));break;case 200:localStorage.setItem("user",JSON.stringify(e.user)),swal({title:"Register Success",text:"Registration succeeded. Redirecting you to your dashboard...",timer:2e3,type:"success",showConfirmButton:!1},function(){location.href="/dashboard"});break;case 500:default:swal({title:"Register Failure",text:"Unexpected error happended! Please try again and contact us if problem persists.",type:"error",confirmButtonText:"OK"})}},"json").error(function(){swal({title:"Register Failure",text:"Failed to connect to backend server! Please try again later.",type:"error",confirmButtonText:"OK"})}).always(function(){$("#register-card form").removeClass("busy")})}),$.get(config.backend_base,function(e){(e.status=e.user)?(localStorage.setItem("user",JSON.stringify(e.user)),swal({title:"Hi, "+e.user.name+"!",text:"Welcome back, we are redirecting you to your dashboard...",timer:2e3,type:"info",showConfirmButton:!1},function(){location.href="/dashboard"})):localStorage.removeItem("user")},"json")});